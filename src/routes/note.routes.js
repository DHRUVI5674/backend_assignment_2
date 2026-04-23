const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById, putNote ,patchNote,deleteNote} = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/bulk',createMultiple);
router.get('/',getAllNote);
router.get('/:id',getNoteById);
router.put('/:id',putNote);
router.patch('/:id',patchNote);
router.delete('/:id',deleteNote);
module.exports = router;