import db from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export const signup = (req, res) => {
    const { name, surname, username, email, role, password } = req.body

    if (!['admin', 'staff', 'customer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid user role' })
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error hashing password: ${err}` })
        }

        db.execute(
            'INSERT INTO User (name, surname, username, email, role, password) VALUES (?, ?, ?, ?, ?, ?)',
            [name, surname, username, email, role, hashedPassword],
            (err, result) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        return res.status(409).json({ error: 'Username or email already exists' })
                    }
                    console.error(err)
                    return res.status(500).json({ error: `Error occurred while signing up the user: ${err}` })
                }

                const token = jwt.sign({id: result.insertId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' })

                res.status(201).json({
                    message: 'User created successfully',
                    token,
                    id: result.insertId,
                    role: role
                })
            }
        )
    })
}

export const login = (req, res) => {
    const { email, password } = req.body

    db.execute('SELECT * FROM User WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while logging in: ${err}` })
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email' })
        }

        const user = result[0]

        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error comparing passwords: ${err}` })
            }

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' })
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
        })
    })
}

export const getProfile = (req, res) => {
    const { id } = req.params;

    db.execute('SELECT id, name, surname, username, email, role FROM User WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while retrieving the profile: ${err}` })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(result[0])
    })
}

export const updateProfile = (req, res) => {
    const { id } = req.params
    const { name, surname, username, email } = req.body

    db.execute(
        'UPDATE User SET name = ?, surname = ?, username = ?, email = ? WHERE id = ?',
        [name, surname, username, email, id],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Username or email already exists' })
                }
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the profile: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' })
            }

            res.status(200).json({ message: 'Profile updated successfully' })
        }
    )
}

export const deleteProfile = (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM User WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the user: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({ message: 'User deleted successfully' })
    })
}

export const getAllUsers = (req, res) => {
    db.execute('SELECT id, name, surname, username, email, role FROM User', (err, result) => {
        if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error occurred while fetching users' })
        }
        res.status(200).json(result)
    })
}