const { chromaClient } = require("../database/chroma");
const { embeddingFunction } = require("./embeddingFunction ");
let collection;

async function getCollection() {
  if (!collection) {
    collection = await chromaClient.getOrCreateCollection({
      name: "notes_rag",
      embeddingFunction: embeddingFunction,
      metadata: { "hnsw:space": "cosine" },
    });
  }
  return collection;
}

async function addNoteToChroma(noteId, title, plainText, metadata = {}) {
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

async function searchNotes(queryText, limit = 5) {
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

module.exports = { getCollection, addNoteToChroma, searchNotes };
