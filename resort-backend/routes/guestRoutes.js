import express from 'express';
import { addGuest, updateGuest, deleteGuest, getAllGuests,getGuestById } from "../controllers/guestController.js";
;

const router = express.Router();

// Routes for Guests
router.post("/", addGuest); // Add a new guest
router.put("/:id", updateGuest); // Update an existing guest
router.delete("/:id", deleteGuest); // Delete a guest
router.get("/", getAllGuests); // Get all guests
router.get("/:id", getGuestById); // Get a guest by ID

export default router;
