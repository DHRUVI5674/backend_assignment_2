const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote } = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/multiple',createMultiple);
router.get('/',getAllNote)

module.exports = router;