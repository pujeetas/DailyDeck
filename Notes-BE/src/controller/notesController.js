const NotesModel = require("../schema/notesSchema");

//create note
const createNote = async (req, res) => {
  try {
    const noteDetails = req.body;

    if (!Array.isArray(noteDetails.body)) {
      return res.status(400).send("Invalid body format: expected an array.");
    }

    if (typeof noteDetails.pinned !== "boolean") {
      return res.status(400).send("Invalid pinned format: expected a boolean.");
    }

    const newNote = new NotesModel({
      title: noteDetails.title || "",
      body: noteDetails.body,
      pinned: noteDetails.pinned,
    });

    await newNote.save();
    // FIXED: Return the created note object instead of just a message
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//get all notes
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await NotesModel.find().sort({ updatedAt: -1 });
    res.json(allNotes);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//update note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const detailsToUpdate = req.body;

    // Validate that we're not setting title to undefined
    if (detailsToUpdate.title === undefined) {
      delete detailsToUpdate.title;
    }

    const noteInDB = await NotesModel.findByIdAndUpdate(
      noteId,
      detailsToUpdate,
      { new: true, runValidators: true }
    );

    if (!noteInDB) {
      return res.status(404).send("Note not found");
    }

    res.json(noteInDB);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//delete note
const deleteNote = async (req, res) => {
  try {
    const deleteNoteId = req.params.id;
    const deletedNote = await NotesModel.findByIdAndDelete(deleteNoteId);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }

    res.json({ message: "Note Deleted", _id: deleteNoteId });
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

module.exports = { createNote, getAllNotes, updateNote, deleteNote };
