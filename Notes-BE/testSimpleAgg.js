import "dotenv/config";
import mongoose from "mongoose";
import { NotesModel } from "./src/schema/notesSchema.js";

async function testSimpleAgg() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Test a simple aggregation
    const results = await NotesModel.aggregate([
      { $match: { embedding: { $exists: true } } },
      { $project: { _id: 1, title: 1 } },
      { $limit: 5 },
    ]);

    console.log("Simple aggregation results:", results.length);
    results.forEach((r) => console.log("-", r.title));
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testSimpleAgg();
