import db from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export const signup = async (req, res) => {
    const { name, surname, username, email, role, password } = req.body

    try {
        const studentEmailRegex = /^[0-9]+@dut4life\.ac\.za$/
        const emailRegex = /^([a-z]+[a-z]?)@dut\.ac\.za$|^([a-z]+[a-z]?[a-z])@dut\.ac\.za$|^([a-z]+[a-z])@dut\.ac\.za$/

        if (!(studentEmailRegex.test(email) || emailRegex.test(email))) {
            return res.status(400).json({ error: 'Invalid email format. Must be DUT email'})
        }

        if (!['admin', 'staff', 'customer'].includes(role)) {
            return res.status(400).json({ error: 'Invalid user role'})
        }

        const [existingUser] = await db.execute('SELECT * FROM User WHERE username = ?', [username])
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Username already in use'})
        }

        const [existingEmail] = await db.execute('SELECT * FROM User WHERE email = ?', [email])
        if (existingEmail.length > 0) {
            return res.status(409).json({ error: 'Email already in use'})
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' })
        }        

        const hashedPassword = await bcrypt.hash(password, 10)

        const [result] = await db.execute('INSERT INTO User (name, surname, username, email, role, password) VALUES (?, ?, ?, ?, ?, ?)', [name, surname, username, email, role, hashedPassword])

        res.status(201).json({
            message: 'User created successfully',
            id: result.insertId,
            role: role
        })
    } catch (error) {
        console.error('Error signing up user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

