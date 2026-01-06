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
