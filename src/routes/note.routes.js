const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById, putNote } = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/multiple',createMultiple);
router.get('/',getAllNote);
router.get('/:id',getNoteById);
router.put('/:id',putNote);

module.exports = router;