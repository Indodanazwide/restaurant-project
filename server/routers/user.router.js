import express from 'express'
import { deleteProfile, getAllUsers, getProfile, login, signup, updateProfile } from '../controllers/user.controller.js'
import { authorize } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/profile/:id', authorize(['customer', 'admin']), getProfile)
userRouter.put('/profile/:id', authorize(['customer', 'admin']), updateProfile)
userRouter.delete('/profile/:id', authorize(['admin']), deleteProfile)
userRouter.get('/users', authorize(['admin']), getAllUsers)

export default userRouter