const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_TOKEN,
});
const embeddingFunction = {
  generate: async (texts) => {
    const response = await cohere.embed({
      model: "embed-english-v3.0",
      texts: texts,
      inputType: "search_document",
    });

    return response.embeddings;
  },
};

module.exports = { embeddingFunction };
