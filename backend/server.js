import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import {
	addBoat,
	deleteBoat,
	getBoat,
	getBoatCount,
	getBoats,
} from "./controler/boatControler.js";
import {
	addReservation,
	getBookingsCount,
	getReservation,
	getSingleBooking,
	deleteBooking,
} from "./controler/bookingControler.js";

const PORT = process.env.PORT;
const origin = process.env.VITE_FRONTEND;

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

const upload = multer({ dest: "uploads/" });
server.use("/uploads", express.static("./uploads"));

// boats
server.post("/api/v1/boats", upload.single("pic"), addBoat);

server.get("/api/v1/boats", getBoats);

server.get("/api/v1/boats-total", getBoatCount);

server.get("/api/v1/boats/:id", getBoat);

server.delete("/api/v1/boats/:id", deleteBoat);

// reservations
server.post("/api/v1/reservations", addReservation);

server.get("/api/v1/reservations", getReservation);

server.get("/api/v1/reservations-total", getBookingsCount);

server.get("/api/v1/reservations/:id", getSingleBooking);
server.delete("/api/v1/reservations/:id", deleteBooking);

server.listen(PORT, () => console.log("I am listening to PORT", PORT));
