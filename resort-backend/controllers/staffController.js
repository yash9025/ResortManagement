import db from "../config/db.js"; // Ensure this connects to your MySQL DB

// 🔹 Get all staff members
export const getAllStaff = async (req, res) => {
  try {
    const [staff] = await db.query("SELECT * FROM Staff");
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get a single staff member by ID
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const [staff] = await db.query("SELECT * FROM Staff WHERE staff_id = ?", [id]);

    if (staff.length === 0) return res.status(404).json({ message: "Staff not found" });

    res.json(staff[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to format the date to 'YYYY-MM-DD HH:MM:SS'
function formatDateForMySQL(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
}


// 🔹 Add a new staff member
export const addStaff = async (req, res) => {
  try {
    const { name, email, position, department, phone, status, joined, schedule, salary } = req.body;

    const formattedJoined = formatDateForMySQL(joined);

    const [result] = await db.query(
      "INSERT INTO Staff (name, email, position, department, phone, status, joined, schedule, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, position, department, phone, status, formattedJoined, schedule, salary]
    );

    res.json({ message: "Staff added successfully", staff_id: result.insertId });
  } catch (error) {
    console.error("Add Staff Error:", error); // 👈 helpful for debugging
    res.status(500).json({ error: error.message });
  }
};



// 🔹 Update staff member details
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position, department, phone, status, joined, schedule, salary } = req.body;

    // Format the joined date for MySQL
    const formattedJoined = formatDateForMySQL(joined);

    await db.query(
      "UPDATE Staff SET name=?, email=?, position=?, department=?, phone=?, status=?, joined=?, schedule=?, salary=? WHERE staff_id=?",
      [name, email, position, department, phone, status, formattedJoined, schedule, salary, id]
    );

    res.json({ message: "Staff updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 Delete a staff member
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Staff WHERE staff_id=?", [id]);

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
