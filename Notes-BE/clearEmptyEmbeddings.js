import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";

async function clearEmptyEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await NotesModel.updateMany(
      { embedding: { $size: 0 } },
      { $unset: { embedding: 1 } }
    );
    console.log("Cleared empty embeddings:", result.modifiedCount);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

clearEmptyEmbeddings();
