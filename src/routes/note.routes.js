const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById, putNote ,patchNote,deleteNote,deleteInBulk,getByCategory,getPinned} = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/bulk', createMultiple);

router.get('/', getAllNote);
router.get('/category/:category', getByCategory); 
router.get('/status/:isPinned',getPinned);
router.get('/:id', getNoteById);

router.put('/:id', putNote);
router.patch('/:id', patchNote);

router.delete('/bulk', deleteInBulk);
router.delete('/:id', deleteNote);


module.exports = router;