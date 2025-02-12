import express from 'express'
import userRouter from './routers/user.router.js'
import reservationRouter from './routers/reservation.router.js'
import takeawayRouter from './routers/takeaway.router.js'

const router = express.Router()

router.use('/', userRouter)
router.use('/', reservationRouter)
router.use('/', takeawayRouter)

export default router