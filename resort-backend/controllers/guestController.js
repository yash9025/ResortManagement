import db from "../config/db.js";

// 🔹 Get all guests
export const getAllGuests = async (req, res) => {
    try {
      const [guests] = await db.query("SELECT * FROM Guests");
      res.json(guests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // 🔹 Get a single guest by ID
export const getGuestById = async (req, res) => {
    try {
      const { id } = req.params;
      const [guest] = await db.query("SELECT * FROM Guests WHERE guest_id = ?", [id]);
  
      if (guest.length === 0) return res.status(404).json({ message: "Guest not found" });
  
      res.json(guest[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // 🔹 Add a new guest
export const addGuest = async (req, res) => {
    try {
      const { name, email, phone, tier, dietaryrestrictions, preferredroomtemperature, specialrequest } = req.body;
  
      const [result] = await db.query(
        "INSERT INTO Guests (name, email, phone, tier, dietaryrestrictions, preferredroomtemperature, specialrequest) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, email, phone, tier, dietaryrestrictions, preferredroomtemperature, specialrequest]
      );
  
      res.json({ message: "Guest added successfully", guest_id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // 🔹 Update guest details
export const updateGuest = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone, tier, dietaryrestrictions, preferredroomtemperature, specialrequest } = req.body;
  
      await db.query(
        "UPDATE Guests SET name=?, email=?, phone=?, tier=?, dietaryrestrictions=?, preferredroomtemperature=?, specialrequest=? WHERE guest_id=?",
        [name, email, phone, tier, dietaryrestrictions, preferredroomtemperature, specialrequest, id]
      );
  
      res.json({ message: "Guest updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // 🔹 Delete a guest
export const deleteGuest = async (req, res) => {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM Guests WHERE guest_id=?", [id]);
  
      res.json({ message: "Guest deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  