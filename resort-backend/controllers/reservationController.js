import db from '../config/db.js'; // Import database connection

// Fetch all reservations with guest and room details
const getAllReservations = async (req, res) => {
    try {
        const query = `
            SELECT r.*, g.name AS guest_name, g.email AS guest_email, g.phone AS guest_phone, 
                   ro.number AS room_number, ro.type AS room_type
            FROM Reservations r
            JOIN Guests g ON r.guest_id = g.guest_id
            JOIN Rooms ro ON r.room_id = ro.room_id
        `;
        const [results] = await db.execute(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single reservation by ID with guest and room details
const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT r.*, g.name AS guest_name, g.email AS guest_email, g.phone AS guest_phone, 
                   ro.number AS room_number, ro.type AS room_type
            FROM Reservations r
            JOIN Guests g ON r.guest_id = g.guest_id
            JOIN Rooms ro ON r.room_id = ro.room_id
            WHERE r.reservation_id = ?
        `;
        const [result] = await db.execute(query, [id]);
        if (result.length === 0) return res.status(404).json({ message: "Reservation not found" });
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new reservation
const createReservation = async (req, res) => {
    const { guests, room_id, check_in, check_out, adults, children, total_amount, payment_status, payment_method, special_requests } = req.body;
    const booked_on = new Date().toISOString().split('T')[0];

    // Input validation
    if (!room_id || !check_in || !check_out || !Array.isArray(guests) || guests.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const connection = await db.getConnection(); // Get a connection from the pool
    try {
        await connection.beginTransaction();

        // Insert the reservation
        const reservationQuery = `
            INSERT INTO Reservations (room_id, check_in, check_out, adults, children, status, total_amount, payment_status, payment_method, booked_on, special_requests)
            VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)
        `;
        const [reservationResult] = await connection.execute(reservationQuery, [room_id, check_in, check_out, adults, children, total_amount, payment_status, payment_method, booked_on, special_requests]);

        const reservationId = reservationResult.insertId;

        // Insert guests into the guests table
        const guestInsertPromises = guests.map(async (guest) => {
            const guestQuery = `
                INSERT INTO Guests (reservation_id, name, email, phone)
                VALUES (?, ?, ?, ?)
            `;
            await connection.execute(guestQuery, [reservationId, guest.name, guest.email, guest.phone]);
        });

        // Wait for all guest insertions to complete
        await Promise.all(guestInsertPromises);

        // Update the room status to 'booked'
        const updateRoomQuery = `
            UPDATE Rooms SET status = 'booked' WHERE room_id = ?
        `;
        await connection.execute(updateRoomQuery, [room_id]);

        // Commit the transaction
        await connection.commit();

        res.status(201).json({ message: "Reservation created successfully", reservation_id: reservationId });
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        console.error("Error creating reservation:", error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Update a reservation
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if status is provided
    if (!status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Prepare the SQL query based on the status
        let query;
        let params;

        if (status === "checked-in") {
            // Set check_in to the current date when checking in
            const checkInDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            query = `
                UPDATE Reservations 
                SET check_in = ?, status = ? 
                WHERE reservation_id = ?
            `;
            params = [checkInDate, status, id];
        } else {
            // For other statuses, just update the status
            query = `
                UPDATE Reservations 
                SET status = ? 
                WHERE reservation_id = ?
            `;
            params = [status, id];
        }

        const [result] = await db.execute(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a reservation
const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute("DELETE FROM Reservations WHERE reservation_id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Reservation not found" });
        res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation };