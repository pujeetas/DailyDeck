import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";
import { embeddingFunction } from "./src/services/embeddingFunction.js";

async function testVectorSearch() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Test embedding generation
    const testQuery = "What are my tasks?";
    console.log("Testing embedding generation for:", testQuery);
    const queryEmbeddings = await embeddingFunction.generate([testQuery]);
    console.log("Embeddings result:", queryEmbeddings);
    console.log("Embedding type:", typeof queryEmbeddings[0]);
    console.log("Embedding generated, length:", queryEmbeddings[0].length);
    console.log("First 5 values:", queryEmbeddings[0].slice(0, 5));

    // Test vector search
    console.log("Testing vector search...");
    try {
      // First test: just get all documents with embeddings
      const allWithEmbeddings = await NotesModel.find(
        { embedding: { $exists: true } },
        { _id: 1, title: 1 }
      );
      console.log("Documents with embeddings:", allWithEmbeddings.length);

      // Try using a stored embedding as query to see if it finds itself
      const sampleDoc = await NotesModel.findOne(
        { embedding: { $exists: true } },
        { embedding: 1, title: 1 }
      );
      console.log("Using stored embedding from:", sampleDoc.title);

      const results = await NotesModel.aggregate([
        {
          $vectorSearch: {
            index: "notes_vector_index",
            path: "embedding",
            queryVector: sampleDoc.embedding,
            numCandidates: 10,
            limit: 5,
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

      console.log("Vector search results:", results.length);
      results.forEach((result, i) => {
        console.log(
          `${i + 1}. ID: ${result._id}, Title: ${result.title}, Score: ${
            result.score
          }`
        );
      });
    } catch (error) {
      console.log("Vector search error:", error.message);
      console.log("Full error:", error);
    }
  } catch (error) {
    console.log("Error:", error.message);
    console.log("Full error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testVectorSearch();
