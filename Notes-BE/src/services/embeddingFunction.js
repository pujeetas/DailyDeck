import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
  token: process.env.COHERE_TOKEN,
});

export const embeddingFunction = {
  generate: async (texts) => {
    const response = await cohere.embed({
      model: "embed-english-v3.0",
      texts: texts,
      inputType: "search_document",
    });

    return response.embeddings;
  },
};
