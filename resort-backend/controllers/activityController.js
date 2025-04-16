import db from "../config/db.js"; // Ensure this connects to your MySQL DB

// 🔹 Get all activities
export const getAllActivities = async (req, res) => {
  try {
    const [activities] = await db.query("SELECT * FROM Activities");
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get a single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const [activity] = await db.query("SELECT * FROM Activities WHERE activity_id = ?", [id]);

    if (activity.length === 0) return res.status(404).json({ message: "Activity not found" });

    res.json(activity[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Add a new activity
export const addActivity = async (req, res) => {
  try {
    const { name, type, price, duration, capacity, status, description, equipment, min_age, start_time, end_time } = req.body;

    const [result] = await db.query(
      "INSERT INTO Activities (name, type, price, duration, capacity, status, description, equipment, min_age, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, type, price, duration, capacity, status, description, equipment, min_age, start_time, end_time]
    );

    res.json({ message: "Activity added successfully", activity_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Update an existing activity
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, price, duration, capacity, status, description, equipment, min_age, start_time, end_time } = req.body;

    await db.query(
      "UPDATE Activities SET name=?, type=?, price=?, duration=?, capacity=?, status=?, description=?, equipment=?, min_age=?, start_time=?, end_time=? WHERE activity_id=?",
      [name, type, price, duration, capacity, status, description, equipment, min_age, start_time, end_time, id]
    );

    res.json({ message: "Activity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Activities WHERE activity_id=?", [id]);

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
