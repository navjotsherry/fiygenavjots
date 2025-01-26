import express from "express";
import * as FormBuilder from "../controllers/formBuilder.js";

const router = express.Router();

// GET Routes for forms
router.get('/forms/:id', FormBuilder.getFormById);          // Fetch a single form by ID
router.get('/forms/list', FormBuilder.getAllForms);             // Fetch all forms

// POST Routes for forms and responses
router.post('/forms', FormBuilder.createForm);             // Create a new form
router.post('/forms/submit', FormBuilder.submitFormResponse); // Submit responses for a form

// PUT Route to update a form
router.put('/forms/:id', FormBuilder.updateForm);          // Update an existing form by ID

// DELETE Route to delete a form
router.delete('/forms/:id', FormBuilder.deleteForm);       // Delete a form by ID

export default router;