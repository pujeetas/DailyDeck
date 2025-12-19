import { ChromaClient as chromaClient } from "chromadb";
import { embeddingFunction } from "./embeddingFunction.js";
let collection;

export async function getCollection() {
  if (!collection) {
    collection = await chromaClient.getOrCreateCollection({
      name: "notes_rag",
      embeddingFunction: embeddingFunction,
      metadata: { "hnsw:space": "cosine" },
    });
  }
  return collection;
}

export async function addNoteToChroma(noteId, title, plainText, metadata = {}) {
  const collection = await getCollection();

  if (!plainText.trim()) {
    console.log("Skipping empty note:", noteId);
    return;
  }
  await collection.upsert({
    ids: [noteId],
    documents: [`${title || "Untitled"}\n\n${plainText}`],
    metadatas: [
      {
        title: title || "",
        ...metadata,
        updatedAt: new Date().toISOString(),
      },
    ],
  });
}

export async function searchNotes(queryText, limit = 5) {
  const collection = await getCollection();

  const results = await collection.query({
    queryTexts: [queryText],
    nResults: limit,
  });
  return {
    ids: results.ids[0] || [],
    distances: results.distances[0] || [],
    documents: results.documents[0] || [],
    metadatas: results.metadatas[0] || [],
  };
}
