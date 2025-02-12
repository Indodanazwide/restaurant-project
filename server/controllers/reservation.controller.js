import db from '../db.js'

export const createTable = (req, res) => {
    const { table_number, location, seats } = req.body

    db.query(
        'INSERT INTO TableEntity (table_number, location, seats) VALUES (?, ?, ?)',
        [table_number, location, seats],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: `Error occurred while creating the table: ${err}` })
            }

            res.status(201).json({
                message: 'Table created successfully',
                tableId: result.insertId
            })
        }
    )
}

export const readTable = (req, res) => {
    const { id } = req.params
    const query = id
        ? 'SELECT * FROM TableEntity WHERE id = ?'
        : 'SELECT * FROM TableEntity'
    const params = id ? [id] : []

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading table(s): ${err}` })
        }
        res.status(200).json(result)
    });
};

export const updateTable = (req, res) => {
    const { id } = req.params
    const { table_number, location, seats } = req.body

    db.query(
        'UPDATE TableEntity SET table_number = ?, location = ?, seats = ? WHERE id = ?',
        [table_number, location, seats, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: `Error occurred while updating the table: ${err}` });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Table not found' })
            }

            res.status(200).json({ message: 'Table updated successfully' })
        }
    )
}

export const deleteTable = (req, res) => {
    const { id } = req.params

    db.query('DELETE FROM TableEntity WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the table: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Table not found' })
        }

        res.status(200).json({ message: 'Table deleted successfully' })
    })
}

export const createReservation = (req, res) => {
    const { user_id, table_id, time, number_of_people, status } = req.body

    db.query(
        'INSERT INTO Reservation (user_id, table_id, time, number_of_people, status) VALUES (?, ?, ?, ?, ?)',
        [user_id, table_id, time, number_of_people, status],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while creating the reservation: ${err}` })
            }

            res.status(201).json({
                message: 'Reservation created successfully',
                reservationId: result.insertId
            })
        }
    )
}

export const readReservation = (req, res) => {
    const { id } = req.params;
    const query = id
        ? 'SELECT * FROM Reservation WHERE id = ?'
        : 'SELECT * FROM Reservation'
    const params = id ? [id] : []

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while reading reservation(s): ${err}` })
        }
        res.status(200).json(result)
    })
}

export const updateReservation = (req, res) => {
    const { id } = req.params
    const { table_id, time, number_of_people, status } = req.body

    db.query(
        'UPDATE Reservation SET table_id = ?, time = ?, number_of_people = ?, status = ? WHERE id = ?',
        [table_id, time, number_of_people, status, id],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: `Error occurred while updating the reservation: ${err}` })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reservation not found' })
            }

            res.status(200).json({ message: 'Reservation updated successfully' })
        }
    )
}

export const deleteReservation = (req, res) => {
    const { id } = req.params

    db.query('DELETE FROM Reservation WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: `Error occurred while deleting the reservation: ${err}` })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found' })
        }

        res.status(200).json({ message: 'Reservation deleted successfully' })
    })
}