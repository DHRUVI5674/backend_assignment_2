const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById, putNote ,patchNote,deleteNote,deleteInBulk,getByCategory,getPinned,noteSummary,getFilter,getPin,findByCategory} = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/bulk', createMultiple);

router.get('/', getAllNote);
router.get('/filter',getFilter);
router.get('/filter/pinned',getPin);
router.get('/category/:category', getByCategory); 
router.get('/status/:isPinned',getPinned);
router.get('/filter/category',findByCategory);
router.get('/:id/summary',noteSummary);
router.get('/:id', getNoteById);

router.put('/:id', putNote);
router.patch('/:id', patchNote);

router.delete('/bulk', deleteInBulk);
router.delete('/:id', deleteNote);



module.exports = router;