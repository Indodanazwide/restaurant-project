import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router.js'
import db from './db.js'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors({ origin: '*' }))

server.use('/api', router)

server.listen(port, () => {
    console.log('Server runnng on port', port)
})