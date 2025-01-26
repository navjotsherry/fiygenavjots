import express from 'express';
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
  submitFormResponse,
} from '../controllers/formController.js';

const formRouter = express.Router();

// Route to create a new form
formRouter.post('/save', createForm);

// Route to get all forms
formRouter.get('/list', getAllForms);

// Route to get a single form by ID
formRouter.get('/:id', getFormById);

// Route to update a form by ID
formRouter.put('/:id', updateForm);

// Route to delete a form by ID
formRouter.delete('/:id', deleteForm);

// Route to submit form responses
formRouter.post('/submit', submitFormResponse);

export default formRouter;