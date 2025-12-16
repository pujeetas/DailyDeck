import { CloudClient } from "chromadb";

export const chromaClient = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: "notes_rag",
});
