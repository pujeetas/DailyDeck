import { NotesModel } from "../schema/notesSchema.js";
import { embeddingFunction } from "./embeddingFunction.js";

export async function addNoteEmbedding(noteId, title, plainText) {
  if (!plainText.trim()) {
    return;
  }

  const text = `${title || "Untitled"}\n\n${plainText}`;
  const embeddings = await embeddingFunction.generate([text]);
  const embedding = embeddings[0];

  await NotesModel.findByIdAndUpdate(noteId, { embedding });
}

export async function searchNotesWithFallback(queryText, userId, limit = 5) {
  let notes = [];
  try {
    const results = await searchNotes(queryText, limit, userId);
    if (results.ids.length > 0) {
      const found = await NotesModel.find({ _id: { $in: results.ids }, userId });
      const byId = new Map(found.map((n) => [n._id.toString(), n]));
      notes = results.ids.map((id) => byId.get(id)).filter(Boolean);
    }
  } catch (err) {
    console.error(
      "searchNotesWithFallback: vector search failed, falling back to title match:",
      err.message,
    );
  }

  if (notes.length === 0) {
    notes = await NotesModel.find({
      userId,
      title: { $regex: queryText, $options: "i" },
    }).limit(limit);
  }

  return notes;
}

export async function findRelatedNotes(noteId, userId, limit = 3) {
  const note = await NotesModel.findOne({ _id: noteId, userId });
  if (!note || !note.embedding || note.embedding.length === 0) {
    return [];
  }

  const results = await NotesModel.aggregate([
    {
      $vectorSearch: {
        index: "notes_vector_index",
        path: "embedding",
        queryVector: note.embedding,
        numCandidates: 100,
        limit: limit + 10,
      },
    },
    {
      $project: {
        userId: 1,
        title: 1,
        updatedAt: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
    {
      $match: {
        userId: userId,
        _id: { $ne: note._id },
      },
    },
  ]);

  return results.slice(0, limit);
}

export async function searchNotes(queryText, limit = 5, userId) {
  try {
    const queryEmbeddings = await embeddingFunction.generate([queryText]);

    const queryEmbedding = queryEmbeddings[0];

    const results = await NotesModel.aggregate([
      {
        $vectorSearch: {
          index: "notes_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit,
        },
      },
      {
        $project: {
          userId: 1,
          title: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $match: {
          userId: userId,
        },
      },
    ]);

    return {
      ids: results.map((doc) => doc._id.toString()),
      distances: results.map((doc) => doc.score),
      documents: [],
      metadatas: results.map((doc) => ({ title: doc.title })),
    };
  } catch (error) {
    console.error("=== ERROR in searchNotes ===", error);
    throw error;
  }
}
