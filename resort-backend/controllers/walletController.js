import db from "../config/db.js"; // Assuming you have a db.js for MySQL connection

// 🔹 Get all wallet offers
export const getAllOffers = async (req, res) => {
  try {
    const [offers] = await db.query("SELECT * FROM WalletOffers");
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get a single offer by ID
export const getOfferById = async (req, res) => {
  try {
    const { offer_id } = req.params;
    const [offer] = await db.query("SELECT * FROM WalletOffers WHERE offer_id = ?", [offer_id]);

    if (offer.length === 0) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json(offer[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Add a new wallet offer
export const addOffer = async (req, res) => {
  const { name, description, discount, type, is_active, min_spend, max_discount, applicable_rooms } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO WalletOffers (name, description, discount, type, is_active, min_spend, max_discount, applicable_rooms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, discount, type, is_active, min_spend, max_discount, applicable_rooms]
    );

    res.status(201).json({ message: "Offer added successfully", offer_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Update an existing wallet offer
export const updateOffer = async (req, res) => {
  const { offer_id } = req.params;
  const { name, description, discount, type, is_active, min_spend, max_discount, applicable_rooms } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE WalletOffers SET name=?, description=?, discount=?, type=?, is_active=?, min_spend=?, max_discount=?, applicable_rooms=? WHERE offer_id=?",
      [name, description, discount, type, is_active, min_spend, max_discount, applicable_rooms, offer_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json({ message: "Offer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Delete a wallet offer
export const deleteOffer = async (req, res) => {
  const { offer_id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM WalletOffers WHERE offer_id=?", [offer_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
