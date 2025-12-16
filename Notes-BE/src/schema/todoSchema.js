const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubtaskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    complete: { type: Boolean, default: false },
  },
  { _id: false, versionKey: false }
);

const todoSchema = new Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    issueId: {
      type: String,
    },
    tech: [{ type: String }],
    status: {
      type: String,
      enum: ["backlog", "progress", "review", "done"],
      default: "backlog",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low", ""],
      default: "",
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    subTask: [SubtaskSchema],
    focused: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    gitURL: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
