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
  console.log("=== searchNotes called ===");
  console.log("queryText:", queryText);
  console.log("limit:", limit);

  try {
    console.log("Generating embeddings...");
    const queryEmbeddings = await embeddingFunction.generate([queryText]);
    console.log("Embeddings generated:", queryEmbeddings);

    const queryEmbedding = queryEmbeddings[0];
    console.log("Query embedding:", queryEmbedding);

    console.log("Running vector search...");
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
          _id: 1,
          title: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    console.log("Vector search completed, results:", results);

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
