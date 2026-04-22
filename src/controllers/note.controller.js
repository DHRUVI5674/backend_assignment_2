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



module.exports = {
    createNote
};