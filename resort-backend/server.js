import express from "express";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import activityRoutes from "./routes/activityRoutes.js"
import walletRoutes from "./routes/walletRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js";
import roomServiceRoutes from './routes/roomserviceRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/wallet/offers", walletRoutes);
app.use("/api/reservations", reservationRoutes);
app.use('/api/roomservices', roomServiceRoutes);

app.get("/", (req, res) => {
  res.send("Server running on port 5000");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
