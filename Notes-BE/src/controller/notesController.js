import "dotenv/config";

import { NotesModel } from "../schema/notesSchema.js";

import {
  addNoteEmbedding,
  searchNotes,
} from "../services/mongoVectorService.js";
import { extractPlainTextFromBlockNote } from "../services/extractPlainTextFromEditor.js";

import { Anthropic } from "@anthropic-ai/sdk";
import { UserModel } from "../schema/userSchema.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

//create note
export const createNote = async (req, res) => {
  try {
    const noteDetails = req.body;
    if (!Array.isArray(noteDetails.body)) {
      return res.status(400).send("Invalid body format: expected an array.");
    }

    if (typeof noteDetails.pinned !== "boolean") {
      return res.status(400).send("Invalid pinned format: expected a boolean.");
    }

    const newNote = new NotesModel({
      userId: req.user.id,
      title: noteDetails.title || "",
      body: noteDetails.body,
      pinned: noteDetails.pinned,
    });

    await newNote.save();

    const totalNotes = await NotesModel.countDocuments({ userId: req.user.id });

    // Add to vector search
    const plainText = extractPlainTextFromBlockNote(newNote.body);
    if (plainText.trim()) {
      await addNoteEmbedding(newNote._id.toString(), newNote.title, plainText);
    }

    res.status(201).json({ note: newNote, totalNotes });
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//get all notes
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const allNotes = await NotesModel.find({ userId: userId }).sort({
      updatedAt: -1,
    });

    res.json(allNotes);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//update note
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const detailsToUpdate = req.body;

    if (detailsToUpdate.title === undefined) {
      delete detailsToUpdate.title;
    }

    const noteInDB = await NotesModel.findByIdAndUpdate(
      noteId,
      detailsToUpdate,
      { new: true, runValidators: true },
    );

    if (!noteInDB) {
      return res.status(404).send("Note not found");
    }

    if (detailsToUpdate.body) {
      const plainText = extractPlainTextFromBlockNote(noteInDB.body);

      if (plainText.trim()) {
        await addNoteEmbedding(noteId, noteInDB.title, plainText);
      }

      res.json(noteInDB);
    }
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//delete note
export const deleteNote = async (req, res) => {
  try {
    const deleteNoteId = req.params.id;
    const deletedNote = await NotesModel.findByIdAndDelete(deleteNoteId);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }

    const totalNotes = await NotesModel.countDocuments({ userId: req.user.id });

    res.json({ message: "Note Deleted", _id: deleteNoteId, totalNotes });
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//get question
export const getQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    if (!question || question.trim() === "") {
      console.log("2. Question validation failed");
      return res.status(400).json({
        error: "Question is required and cannot be empty",
      });
    }

    const mongoVectorResults = await searchNotes(question, 5, userId);
    if (mongoVectorResults.ids.length === 0) {
      return res.status(200).json({
        answer: "I couldn't find any relevant notes to answer your question.",
        question: question,
      });
    }
    // Get full notes from MongoDB
    const notes = await NotesModel.find({
      _id: { $in: mongoVectorResults.ids },
    });

    const context = notes
      .map((note, idx) => {
        const plainText = extractPlainTextFromBlockNote(note.body);
        return `Note ${idx + 1} (${note.title || "Untitled"}):\n${plainText}`;
      })
      .join("\n\n---\n\n");
    // Call Claude API
    try {
      const message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Based on the following notes, please answer this question: "${question}"Relevant Notes:${context}
            Please provide a clear and concise answer based only on the information in these notes.`,
          },
        ],
      });

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { aiSearches: 1 },
        },
        { new: true },
      );

      const answer = message.content[0].text;
      res.status(200).json({
        question: question,
        answer: answer,
        relevantNotes: notes.map((n) => ({ id: n._id, title: n.title })),
        aiSearches: updatedUser.aiSearches,
      });
    } catch (aiError) {
      console.error("Claude API error:", aiError);
      return res.status(200).json({
        question: question,
        answer:
          "AI is temporarily unavailable, but here are relevant notes that might help.",
        relevantNotes: notes.map((n) => ({ id: n._id, title: n.title })),
        aiError: true,
      });
    }
  } catch (error) {
    console.error("Error in getQuestion:", error);
    res.status(500).json({
      error: "Internal server error: " + error.message,
    });
  }
};
