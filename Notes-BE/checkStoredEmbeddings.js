import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";

async function checkEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get one note with embedding
    const note = await NotesModel.findOne({ embedding: { $exists: true } });
    if (note) {
      console.log("Note found with embedding:");
      console.log("- ID:", note._id);
      console.log("- Title:", note.title);
      console.log(
        "- Embedding length:",
        note.embedding ? note.embedding.length : "null"
      );
      console.log(
        "- First 5 embedding values:",
        note.embedding ? note.embedding.slice(0, 5) : "null"
      );
    } else {
      console.log("No notes with embeddings found");
    }

    // Count notes with embeddings
    const count = await NotesModel.countDocuments({
      embedding: { $exists: true },
    });
    console.log("Total notes with embeddings:", count);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkEmbeddings();
