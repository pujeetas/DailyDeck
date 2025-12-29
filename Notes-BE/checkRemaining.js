import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";
import { extractPlainTextFromBlockNote } from "./src/services/extractPlainTextFromEditor.js";

async function checkRemaining() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const notesWithout = await NotesModel.find({
      embedding: { $exists: false },
    });
    console.log("Notes without embeddings:");
    for (const note of notesWithout) {
      const plainText = extractPlainTextFromBlockNote(note.body);
      console.log("- ID:", note._id, "Title:", note.title || "No title");
      console.log("  Plain text length:", plainText.length);
      console.log("  Has content:", plainText.trim().length > 0 ? "Yes" : "No");
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkRemaining();
