const mongoose = require('mongoose');
const Note = require('../models/note.model.js');


// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // basic validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }
    const note = await Note.create({
      title,
      content,
      category,
      isPinned: isPinned || false,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

//create multiple notes
const createMultiple = async (req,res) =>{
  const notes = req.body.notes;
  try{
    const notesData = await Note.insertMany(notes);
    res.status(200).json({success: true,
      message: "Notes created successfully",
      data: notesData})
  }
  catch(err){
    res.status(404).json({
  "success": false,
  "message": "Notes not crreated",
  "data": null
})
  }
}

//get all the notes
const getAllNote = async (req,res) =>{
  try{
    const notes = await Note.find();
    res.status(200).json({
      "success":true,
      "message": "Notes fetched successfully",
      "data": notes
    })
  }
  catch(err){
    res.status(404).json({
      "success":false,
      "message": "Notes cannot fetched successfully",
      "data": null
    })
  }
}

//get the note by id
const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);

    res.status(200).json({
      success: true,
      message: "Note fetched successfully by id",
      data: note
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Note could not be fetched by id",
      data: null
    });
  }
};


//put the changes
const putNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      req.body,
      { new: true}
    );
    res.status(200).json({
      success: true,
      message: `Note updated successfully`,
      data: updatedNote
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      data: null
    });
  }
};




module.exports = {
    createNote,
    createMultiple,
    getAllNote,
    getNoteById,
    putNote
};