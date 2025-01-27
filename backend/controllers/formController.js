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
    where: { id },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  res.json({ form });
});

// Update a form
export const updateForm = asyncAwaitErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { formName, formData } = req.body;

  const form = await prisma.form.findUnique({
    where: { id },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  const updatedForm = await prisma.form.update({
    where: { id },
    data: {
      formName: formName || form.formName,
      formData: formData || form.formData,
    },
  });

  res.json({ message: "Form updated successfully", updatedForm });
});

// Delete a form
export const deleteForm = asyncAwaitErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const form = await prisma.form.findUnique({
    where: { id },
  });

  if (!form) {
    return next(new ErrorHandler("Form not found", 404));
  }

  await prisma.form.delete({
    where: { id },
  });

  res.json({ message: "Form deleted successfully" });
});