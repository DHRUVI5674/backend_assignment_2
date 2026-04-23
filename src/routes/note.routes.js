const express = require('express');
const router = express.Router();

const { createNote,createMultiple, getAllNote,getNoteById, putNote ,patchNote,deleteNote,deleteInBulk,getByCategory,getPinned,noteSummary,getFilter,getPin,findByCategory,findByDate,paginateAll,paginateByCategory,sortNotes,sortPinned} = require('../controllers/note.controller.js');

router.post('/', createNote);
router.post('/bulk', createMultiple);

router.get('/', getAllNote);
router.get('/paginate',paginateAll);
router.get('/sort',sortNotes);
router.get('/paginate/category/:category',paginateByCategory);
router.get('/filter',getFilter);
router.get('/sort/pinned',sortPinned);
router.get('/filter/pinned',getPin);
router.get('/filter/category',findByCategory);
router.get('/filter/date-range',findByDate);
router.get('/category/:category', getByCategory); 
router.get('/status/:isPinned',getPinned);
router.get('/:id/summary',noteSummary);
router.get('/:id', getNoteById);

router.put('/:id', putNote);
router.patch('/:id', patchNote);

router.delete('/bulk', deleteInBulk);
router.delete('/:id', deleteNote);



module.exports = router;