import { prisma } from "../index.js"; // Import Prisma client
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncAwaitErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }

  // Verify the token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Fetch user from the database
  const user = await prisma.user.findUnique({
    where: { id: decodedData.id },
  });

  if (!user) {
    return next(new ErrorHandler("User does not exist", 401));
  }

  req.user = user; // Attach user data to the request object
  next();
});
