const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
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

const NotesModal = mongoose.model("Notes", noteSchema);

module.exports = NotesModal;
