import express from "express";
import {
  getAllStaff,
  getStaffById,
  addStaff,
  updateStaff,
  deleteStaff
} from "../controllers/staffController.js";

const router = express.Router();

// Routes
router.get("/", getAllStaff); // Get all staff members
router.get("/:id", getStaffById); // Get a single staff member by ID
router.post("/", addStaff); // Add a new staff member
router.put("/:id", updateStaff); // Update staff details
router.delete("/:id", deleteStaff); // Delete a staff member

export default router;
