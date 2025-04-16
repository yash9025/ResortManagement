import express from "express";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import roomServiceRoutes from './routes/roomserviceRoutes.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// API Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/wallet/offers", walletRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/roomservices", roomServiceRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server running on port 5000");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
