import { NotesModel } from "../schema/notesSchema.js";
import { embeddingFunction } from "./embeddingFunction.js";

export async function addNoteEmbedding(noteId, title, plainText) {
  if (!plainText.trim()) {
    console.log("Skipping empty note:", noteId);
    return;
  }

  const text = `${title || "Untitled"}\n\n${plainText}`;
  const embeddings = await embeddingFunction.generate([text]);
  const embedding = embeddings[0];

  await NotesModel.findByIdAndUpdate(noteId, { embedding });
}

export async function searchNotes(queryText, limit = 5) {
  const queryEmbeddings = await embeddingFunction.generate([queryText]);
  const queryEmbedding = queryEmbeddings[0];

  const results = await NotesModel.aggregate([
    {
      $vectorSearch: {
        index: "notes_vector_index", // You'll need to create this index in Atlas
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: limit,
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  return {
    ids: results.map((doc) => doc._id.toString()),
    distances: results.map((doc) => doc.score), // Note: score is similarity, higher is better, but Chroma uses distance (lower better). Adjust if needed.
    documents: [], // Not needed since we fetch from Mongo
    metadatas: results.map((doc) => ({ title: doc.title })),
  };
}
