import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";

async function checkEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const totalNotes = await NotesModel.countDocuments();
    const notesWithEmbeddings = await NotesModel.countDocuments({
      embedding: { $exists: true },
    });

    console.log(`Total notes: ${totalNotes}`);
    console.log(`Notes with embeddings: ${notesWithEmbeddings}`);
    console.log(
      `Notes needing embeddings: ${totalNotes - notesWithEmbeddings}`
    );
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkEmbeddings();
