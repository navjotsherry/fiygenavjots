// import ErrorHandler from "../utils/ErrorHandler.js";
// import asyncAwaitErrorHandler from '../utils/asyncAwaitErrorHandler.js'
// import userSchema from "../config/db/userSchema.js";
// import { sendJWToken } from "../utils/sendJWToken.js";
// import cloudinary from 'cloudinary'


//  export const registerUser = asyncAwaitErrorHandler(async (req,res,next)=>{
//     const {name,email,password} = req.body
    
//     const user = await userSchema.create({
//         name, email,password
//     })

//     sendJWToken(user,201,res)
// })


// export const loginUser = asyncAwaitErrorHandler(async (req,res,next)=>{
//     const {email,password} = req.body

//     if(!email || !password){
//         return next(new ErrorHandler("Please enter both email and password",401))
//     }

//     const user = await userSchema.findOne({email}).select("+password")

//     if(!user){
//         return next(new ErrorHandler("Please enter valid email or password",400))
//     }
    
//     const passwordMatched = await user.comparePassword(password)

//     if(!passwordMatched){
//         return next(new ErrorHandler("Please enter valid email or password",400))
//     }

//     sendJWToken(user,200,res)

// })

// //Logout user
// export const logoutUser = asyncAwaitErrorHandler(async (req,res,next)=>{    
//     res.cookie("token", null,
//         {expires: new Date(Date.now()),
//         httpOnly:true,
//         secure:true,
//         sameSite:"none"})
//     res.status(200).json({
//             success:true
//         })
// })


import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";
import { prisma } from "../index.js"; // Import your Prisma client
import { sendJWToken } from "../utils/sendJWToken.js";
import bcrypt from "bcryptjs"; // For password hashing

export const registerUser = asyncAwaitErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return next(new ErrorHandler("Email already registered", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Send JWT token
  sendJWToken(user, 201, res);
});


export const loginUser = asyncAwaitErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please enter both email and password", 401));
    }
  
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
  
    // Compare password
    const passwordMatched = await bcrypt.compare(password, user.password);
  
    if (!passwordMatched) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
  
    // Send JWT token
    sendJWToken(user, 200, res);
  });

export const logoutUser = asyncAwaitErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
  
