const NotesModel = require("../schema/notesSchema");

//create note
const createNote = async (req, res) => {
  try {
    const noteDetails = req.body;

    if (!Array.isArray(noteDetails.body)) {
      return res.status(400).send("Invalid body format: expected an array.");
    }

    if (typeof noteDetails.pinned !== "boolean") {
      return res.status(400).send("Inalid pinned format: expected a boolean.");
    }

    const newNote = new NotesModel({
      title: noteDetails.title,
      body: noteDetails.body,
      pinned: noteDetails.pinned,
    });

    await newNote.save();
    res.send("Note Created Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//get all notes
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();
    if (!allNotes) {
      res.status(400).send("No Notes FOund. Create one now");
    }
    res.send(allNotes);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//update note

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const detailsToUpdate = req.body;

    const noteInDB = await NotesModel.findByIdAndUpdate(
      noteId,
      detailsToUpdate,
      { new: true }
    );
    if (!noteInDB) {
      res.status(400).send("Note cannot be updated");
    }
    res.send(noteInDB);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

//delete note
const deleteNote = async (req, res) => {
  try {
    const deleteNoteId = req.params.id;
    await NotesModel.findByIdAndDelete(deleteNoteId);
    res.send("Note Deleted");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

module.exports = { createNote, getAllNotes, updateNote, deleteNote };
