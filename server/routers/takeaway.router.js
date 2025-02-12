import express from 'express'
import { createCategory, createMenuItem, createPayment, createTakeaway, deleteCategory, deleteMenuItem, deletePayment, deleteTakeaway, readCategory, readMenuItem, readPayment, readTakeaway, updateCategory, updateMenuItem, updatePayment, updateTakeaway } from '../controllers/takeaway.controller.js'
import { authorize } from '../middleware/auth.js'

const takeawayRouter = express.Router()

takeawayRouter.post('/menu/category', authorize(['admin']), createCategory)
takeawayRouter.get('/menu/category', readCategory)
takeawayRouter.put('/menu/category/:id', authorize(['admin']), updateCategory)
takeawayRouter.delete('/menu/category/:id', authorize(['admin']), deleteCategory)
takeawayRouter.post('/menu', authorize(['admin']), createMenuItem)
takeawayRouter.get('/menu', readMenuItem)
takeawayRouter.put('/menu/:id', authorize(['admin']), updateMenuItem)
takeawayRouter.delete('/menu/:id', authorize(['admin']), deleteMenuItem)
takeawayRouter.post('/takeaway', authorize(['customer', 'admin']), createTakeaway)
takeawayRouter.get('/takeaway', authorize(['customer', 'admin']), readTakeaway)
takeawayRouter.put('/takeaway/:id', authorize(['admin']), updateTakeaway)
takeawayRouter.delete('/takeaway/:id', authorize(['admin']), deleteTakeaway)
takeawayRouter.post('/payment', authorize(['customer', 'admin']), createPayment)
takeawayRouter.get('/payment', authorize(['customer', 'admin']), readPayment)
takeawayRouter.put('/payment/:id', authorize(['admin']), updatePayment)
takeawayRouter.delete('/payment/:id', authorize(['admin']), deletePayment)

export default takeawayRouter