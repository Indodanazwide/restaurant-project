import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    try {
        const databaseConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            queueLimit: 0
        })

        console.log('Connected to the database')

        return databaseConnection
    } catch (error) {
        console.error('Error connecting to the database:', error)
        throw error
    }
}

const db = await connectDB()

export default db