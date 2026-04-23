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

//update the selected field by id
const patchNote = async (req,res) =>{
  const noteId = req.params.id;
  try{
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $set: req.body },
      { new: true}
    );
    res.status(200).json({
      success: true,
      message: `Note updated successfully`,
      data: updatedNote
    }); 
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: "Error updating note",
      data: null
    }); 
  }
}

//delete the note by id
const deleteNote = async (req,res) =>{
  const noteId = req.params.id;
  try{
    const deletedNote = await Note.findByIdAndDelete(noteId);
    res.status(200).json({
  "success": true,
  "message": "Note deleted successfully",
  "data": null
})
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      data: null
    });
  }
}

//delete in bulk
const deleteInBulk = async (req, res) => {
  const { ids } = req.body;

  try {
    const deletedNotes = await Note.deleteMany({
      _id: { $in: ids }
    });

    res.status(200).json({
      success: true,
      message: `${deletedNotes.deletedCount} notes deleted successfully`,
      data: null
    });

  } catch (err) {
    console.log(err); 
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      data: null
    });
  }
};

///////ROUTE PARAMETERS/////

//Get by category
const getByCategory = async (req, res) => {
  const Category = req.params.category.trim();

  try {
    const notes = await Note.find({
      category: { $regex: `^${Category}$`, $options: "i" }
    });

    console.log(notes);
    res.status(200).json({
      success: true,
      message: `Notes fetched successfully for category ${Category}`,
      data: notes
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      data: null
    });
  }
};

//Get by pinned status
const getPinned = async (req, res) => {
  const isPinned = req.params.isPinned;

  try {
    const pin = await Note.find({ isPinned: isPinned });

    res.status(200).json({
      success: true,
      message: "Fetched all pinned notes",
      count: pin.length,
      data: pin
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "isPinned must be true or false",
      data: null
    });
  }
};


//Get note summary
const noteSummary = async (req,res) =>{
  const noteId = req.params.id;
  try{
   const note = await Note.findById(noteId, {
  title: 1,category: 1,isPinned: 1,createdAt: 1,
});
   res.status(200).json({
  "success": true,
  "message": "Note summary fetched successfully",
  "data": note
   })
  }
  catch(err){
    res.status(400).json({
  "success": false,
  "message": "Error fetching note summary",
  "data": null
})
  }
}

////Query Parameters////

//General filter
const getFilter = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.isPinned !== undefined) {
      filter.isPinned = req.query.isPinned === "true";
    }
    const notes = await Note.find(filter);
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Notes not fetched successfully",
      data: null
    });
  }
};


//Get pinned notes
const getPin = async (req,res) =>{
  try{
     const filter = { isPinned:true };
     if(req.query.category){
      filter.category = req.query.category;
     }
     const notePinned = await Note.find(filter);
     res.status(200).json({
  "success": true,
  "message": "Pinned notes fetched successfully",
  "count": notePinned.length,
  "data": notePinned
})
  }
  catch(err){
    res.status(400).json({
  "success": false,
  "message": "Pinned notes not fetched successfully",
  "data": null
  })
}
}



module.exports = {
    createNote,
    createMultiple,
    getAllNote,
    getNoteById,
    putNote,
    patchNote,
    deleteNote,
    deleteInBulk,
    getByCategory,
    getPinned,
    noteSummary,
    getFilter,
    getPin
};