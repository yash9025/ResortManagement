import express from "express";
import {
  getAllOffers,
  getOfferById,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/walletController.js";

const router = express.Router();

// 🔹 Route to get all wallet offers
router.get("/", getAllOffers);

// 🔹 Route to get a single offer by ID
router.get("/:offer_id", getOfferById);

// 🔹 Route to add a new offer
router.post("/", addOffer);

// 🔹 Route to update an existing offer
router.put("/:offer_id", updateOffer);

// 🔹 Route to delete an offer
router.delete("/:offer_id", deleteOffer);

export default router;
