import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { prisma } from "../index.js";

// Create a new form
export const createForm = asyncAwaitErrorHandler(async (req, res, next) => {
  const { formName, formData, userId } = req.body;

  if(!userId){
    return next(new ErrorHandler("Please login to use this resource",400))
  }

  if (!formName || !formData) {
    return next(new ErrorHandler("Form name and fields are required", 400));
  }

  const form = await prisma.form.create({
    data: {
      formName,
      formData,
      userId
    },
  });

  res.status(201).json({ message: "Form created successfully", form });
});

// Get all forms
export const getAllForms = asyncAwaitErrorHandler(async (req, res, next) => {
  const forms = await prisma.form.findMany();

  if (!forms || forms.length === 0) {
    return next(new ErrorHandler("No forms found", 404));
  }

  res.json({ forms });
});

// Get a single form by ID
export const getFormById = asyncAwaitErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const form = await prisma.form.findUnique({
    where: { id: parseInt(id) },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  res.json({ form });
});

// Update a form
export const updateForm = asyncAwaitErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, fields } = req.body;

  const form = await prisma.form.findUnique({
    where: { id: parseInt(id) },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  const updatedForm = await prisma.form.update({
    where: { id: parseInt(id) },
    data: {
      name: name || form.name,
      fields: fields ? JSON.stringify(fields) : form.fields,
    },
  });

  res.json({ message: "Form updated successfully", updatedForm });
});

// Delete a form
export const deleteForm = asyncAwaitErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const form = await prisma.form.findUnique({
    where: { id: parseInt(id) },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  await prisma.form.delete({
    where: { id: parseInt(id) },
  });

  res.json({ message: "Form deleted successfully" });
});

// Submit form data
export const submitFormResponse = asyncAwaitErrorHandler(async (req, res, next) => {
  const { formId, responses } = req.body;

  const form = await prisma.form.findUnique({
    where: { id: parseInt(formId) },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  const submission = await prisma.formResponse.create({
    data: {
      formId: parseInt(formId),
      responses: JSON.stringify(responses),
    },
  });

  res.status(201).json({ message: "Form response submitted successfully", submission });
});
