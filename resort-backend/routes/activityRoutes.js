import express from 'express';
import { addActivity, updateActivity, deleteActivity, getAllActivities, getActivityById } from "../controllers/activityController.js";

const router = express.Router();

// Routes for Activities
router.post("/", addActivity); // Add a new activity
router.put("/:id", updateActivity); // Update an existing activity
router.delete("/:id", deleteActivity); // Delete an activity
router.get("/", getAllActivities); // Get all activities
router.get("/:id", getActivityById); // Get an activity by ID

export default router;
