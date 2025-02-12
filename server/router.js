import express from 'express'
import userRouter from './routers/user.router.js'

const router = express.Router()

router.use('/', userRouter)

export default router