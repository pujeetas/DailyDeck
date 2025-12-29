import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";
import { embeddingFunction } from "./src/services/embeddingFunction.js";
import { extractPlainTextFromBlockNote } from "./src/services/extractPlainTextFromEditor.js";

async function addEmbeddingsToExistingNotes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const notes = await NotesModel.find({ embedding: { $exists: false } });
    console.log(`Processing ${notes.length} notes...`);

    for (const note of notes) {
      const plainText = extractPlainTextFromBlockNote(note.body);
      if (plainText.trim()) {
        const text = `${note.title || "Untitled"}\n\n${plainText}`;
        console.log(
          `Processing note ${note._id} with text length: ${plainText.length}`
        );
        const embeddings = await embeddingFunction.generate([text]);
        console.log(`Generated embedding with length: ${embeddings[0].length}`);
        note.embedding = embeddings[0];
        console.log(`Set embedding on note, length: ${note.embedding.length}`);
        await note.save();
        console.log(`Saved note: ${note._id}`);
      } else {
        console.log(`Skipping note ${note._id} - no content`);
      }
    }

    console.log("Done adding embeddings");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addEmbeddingsToExistingNotes();
