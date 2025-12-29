import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";

async function testBasicQuery() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Test basic find
    const count = await NotesModel.countDocuments({
      embedding: { $exists: true },
    });
    console.log("Notes with embeddings:", count);

    // Test if we can query the embedding field
    const note = await NotesModel.findOne(
      { embedding: { $exists: true } },
      { embedding: 1, title: 1 }
    );
    console.log("Sample embedding type:", typeof note.embedding);
    console.log("Sample embedding isArray:", Array.isArray(note.embedding));
    console.log("Sample embedding length:", note.embedding.length);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testBasicQuery();
