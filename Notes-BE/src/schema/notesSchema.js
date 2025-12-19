import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    body: {
      type: [mongoose.Schema.Types.Mixed],
    },

    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NotesModel = mongoose.model("Notes", noteSchema);
