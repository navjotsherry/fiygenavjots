import express from 'express';
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
} from '../controllers/formController.js';

const formRouter = express.Router();

// Route to create a new form
formRouter.post('/forms/save', createForm);

// Route to get all forms
formRouter.get('/forms/list', getAllForms);

// Route to get a single form by ID
formRouter.get('/forms/:id', getFormById);

// Route to update a form by ID
formRouter.put('/forms/:id', updateForm);

// Route to delete a form by ID
formRouter.delete('/forms/:id', deleteForm);

export default formRouter;