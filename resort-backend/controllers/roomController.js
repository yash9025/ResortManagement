import db from "../config/db.js";

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const [rooms] = await db.query(
      "SELECT room_id, number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness FROM Rooms"
    );
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get room by ID
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const [room] = await db.query("SELECT * FROM Rooms WHERE room_id = ?", [id]);
    if (room.length === 0) return res.status(404).json({ message: "Room not found" });
    res.json(room[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new room
export const addRoom = async (req, res) => {
  try {
    const { number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness } = req.body;
    const [result] = await db.query(
      "INSERT INTO Rooms (number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness]
    );
    res.json({ message: "Room added successfully", room_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a room
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness } = req.body;

    await db.query(
      "UPDATE Rooms SET number=?, type=?, price=?, capacity=?, status=?, maintenance=?, temperature=?, lighting=?, cleanliness=? WHERE room_id=?",
      [number, type, price, capacity, status, maintenance, temperature, lighting, cleanliness, id]
    );

    res.json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a room
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Rooms WHERE room_id=?", [id]);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
