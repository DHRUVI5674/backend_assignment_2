const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById } = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/multiple',createMultiple);
router.get('/',getAllNote);
router.get('/:id',getNoteById);

module.exports = router;