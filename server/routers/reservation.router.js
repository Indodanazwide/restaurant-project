import express from 'express'
import { createReservation, createTable, deleteReservation, deleteTable, readReservation, readTable, updateReservation, updateTable } from '../controllers/reservation.controller.js'
import { authorize } from '../middleware/auth.js'

const reservationRouter = express.Router()

reservationRouter.post('/reservation/table', authorize(['admin']), createTable)
reservationRouter.get('/reservation/table', authorize(['customer', 'admin']), readTable)
reservationRouter.put('/reservation/table/:id', authorize(['admin']), updateTable)
reservationRouter.delete('/reservation/table/:id', authorize(['admin']), deleteTable)

reservationRouter.post('/reservation', authorize(['customer', 'admin']), createReservation)
reservationRouter.get('/reservation', authorize(['customer', 'admin']), readReservation)
reservationRouter.put('/reservation/:id', authorize(['customer', 'admin']), updateReservation)
reservationRouter.delete('/reservation/:id', authorize(['admin']), deleteReservation)

export default reservationRouter