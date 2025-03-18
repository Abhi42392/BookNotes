import express from 'express'
import { addNotes, allNotes, getNotes, saveNotes,uploadEbook } from '../controllers/notesController.js';
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js';

const notesRouter=express.Router();

notesRouter.post('/add-notes',authUser,addNotes);
notesRouter.post('/all-notes',authUser,allNotes);
notesRouter.post('/save-notes',saveNotes);
notesRouter.post('/get-notes',getNotes);
notesRouter.post('/upload-ebook',authUser,upload.single('pdf'),uploadEbook);

export default notesRouter