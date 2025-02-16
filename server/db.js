import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        console.log('Connected to the database')
        return pool
    } catch (error) {
        console.error('Error connecting to the database:', error)
        throw error
    }
}

const db = await connectDB().catch(() => process.exit(1))

export default db