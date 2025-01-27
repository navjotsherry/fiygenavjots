import express from 'express'
import { loginUser, registerUser,logoutUser,myProfile } from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)
userRouter.post('/myProfile',myProfile)


export default userRouter