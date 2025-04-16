import db from '../config/db.js'; // adjust path to your db connection if needed

export const getAllRoomServices = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM roomservice ORDER BY request_time DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch room services', error });
  }
};

export const getRoomServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM roomservice WHERE service_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Room service not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch room service', error });
  }
};

export const updateRoomService = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    notes,
    assigned_to_staff_id,
    feedback_rating,
    feedback_comment,
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE roomservice 
       SET status = ?, notes = ?, assigned_to_staff_id = ?, feedback_rating = ?, feedback_comment = ? 
       WHERE service_id = ?`,
      [status, notes, assigned_to_staff_id, feedback_rating, feedback_comment, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Room service not found' });
    }

    res.json({ message: 'Room service updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update room service', error });
  }
};
