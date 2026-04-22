const express = require('express');
const router = express.Router();

const { createNote,createMultiple } = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/multiple',createMultiple);

module.exports = router;