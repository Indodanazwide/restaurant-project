import db from '../db.js'

export const createCategory = (req, res) => {
    const { name } = req.body

    db.execute(
        'INSERT INTO Category (name) VALUES (?)',
        [name],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while creating the category: ${err}` })
            }

            res.status(201).json({
                message: 'Category created successfully',
                categoryId: result.insertId
            })
        }
    )
}

export const readCategory = (req, res) => {
    const { id } = req.params
    const query = id ? 'SELECT * FROM Category WHERE id = ?' : 'SELECT * FROM Category'
    const params = id ? [id] : []

    db.execute(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading category: ${err}` })
        }

        res.status(200).json(result)
    })
}

export const updateCategory = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    db.execute(
        'UPDATE Category SET name = ? WHERE id = ?',
        [name, id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the category: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Category not found' })
            }

            res.status(200).json({ message: 'Category updated successfully' })
        }
    )
}

export const deleteCategory = (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM Category WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the category: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.status(200).json({ message: 'Category deleted successfully' })
    })
}

// Create Menu Item
export const createMenuItem = (req, res) => {
    const { name, image, price, category_id } = req.body

    db.execute(
        'INSERT INTO Menu (name, image, price, category_id) VALUES (?, ?, ?, ?)',
        [name, image, price, category_id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while creating the menu item: ${err}` })
            }

            res.status(201).json({
                message: 'Menu item created successfully',
                menuItemId: result.insertId
            })
        }
    )
}

// Read Menu Item
export const readMenuItem = (req, res) => {
    const { id } = req.params
    const query = id ? 'SELECT * FROM Menu WHERE id = ?' : 'SELECT * FROM Menu'
    const params = id ? [id] : []

    db.execute(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading menu item(s): ${err}` })
        }

        res.status(200).json(result)
    })
}

// Update Menu Item
export const updateMenuItem = (req, res) => {
    const { id } = req.params
    const { name, image, price, category_id } = req.body

    db.execute(
        'UPDATE Menu SET name = ?, image = ?, price = ?, category_id = ? WHERE id = ?',
        [name, image, price, category_id, id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the menu item: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Menu item not found' })
            }

            res.status(200).json({ message: 'Menu item updated successfully' })
        }
    )
}

// Delete Menu Item
export const deleteMenuItem = (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM Menu WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the menu item: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Menu item not found' })
        }

        res.status(200).json({ message: 'Menu item deleted successfully' })
    })
}

// Create Takeaway Order
export const createTakeaway = (req, res) => {
    const { user_id, menu_id, quantity, status } = req.body

    db.execute(
        'INSERT INTO Takeaway (user_id, menu_id, quantity, status) VALUES (?, ?, ?, ?)',
        [user_id, menu_id, quantity, status],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while creating the takeaway order: ${err}` })
            }

            res.status(201).json({
                message: 'Takeaway order created successfully',
                takeawayId: result.insertId
            })
        }
    )
}

// Read Takeaway Order
export const readTakeaway = (req, res) => {
    const { id } = req.params
    const query = id ? 'SELECT * FROM Takeaway WHERE id = ?' : 'SELECT * FROM Takeaway'
    const params = id ? [id] : []

    db.execute(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading takeaway order(s): ${err}` })
        }

        res.status(200).json(result)
    })
}

// Update Takeaway Order
export const updateTakeaway = (req, res) => {
    const { id } = req.params
    const { menu_id, quantity, status } = req.body

    db.execute(
        'UPDATE Takeaway SET menu_id = ?, quantity = ?, status = ? WHERE id = ?',
        [menu_id, quantity, status, id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the takeaway order: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Takeaway order not found' })
            }

            res.status(200).json({ message: 'Takeaway order updated successfully' })
        }
    )
}

// Delete Takeaway Order
export const deleteTakeaway = (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM Takeaway WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the takeaway order: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Takeaway order not found' })
        }

        res.status(200).json({ message: 'Takeaway order deleted successfully' })
    })
}

// Create Payment
export const createPayment = (req, res) => {
    const { user_id, takeaway_id, amount } = req.body

    db.execute(
        'INSERT INTO Payment (user_id, takeaway_id, amount) VALUES (?, ?, ?)',
        [user_id, takeaway_id, amount],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while creating the payment: ${err}` })
            }

            res.status(201).json({
                message: 'Payment created successfully',
                paymentId: result.insertId
            })
        }
    )
}

// Read Payment
export const readPayment = (req, res) => {
    const { id } = req.params
    const query = id ? 'SELECT * FROM Payment WHERE id = ?' : 'SELECT * FROM Payment'
    const params = id ? [id] : []

    db.execute(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading payment(s): ${err}` })
        }

        res.status(200).json(result)
    })
}

// Update Payment
export const updatePayment = (req, res) => {
    const { id } = req.params
    const { amount } = req.body

    db.execute(
        'UPDATE Payment SET amount = ? WHERE id = ?',
        [amount, id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the payment: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Payment not found' })
            }

            res.status(200).json({ message: 'Payment updated successfully' })
        }
    )
}

// Delete Payment
export const deletePayment = (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM Payment WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the payment: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payment not found' })
        }

        res.status(200).json({ message: 'Payment deleted successfully' })
    })
}