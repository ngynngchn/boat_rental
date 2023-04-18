import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import {
	addBoat,
	addReservation,
	deleteBoat,
	getBoat,
	getBoatCount,
	getBoats,
	getReservation,
	getSingleBooking,
} from "./utils/helper.js";

const PORT = process.env.PORT;
const origin = process.env.VITE_FRONTEND;

console.log(origin);
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

const upload = multer({ dest: "uploads/" });
server.use("/uploads", express.static("./uploads"));

// boats
// boat form field endpoint
server.post("/api/v1/boats", upload.single("pic"), addBoat);
// get all boats endpoint
server.get("/api/v1/boats", getBoats);

server.get("/api/v1/boats-total", getBoatCount);

server.get("/api/v1/boats/:id", getBoat);

server.delete("/api/v1/boats/:id", deleteBoat);
// reservations

server.post("/api/v1/reservations", addReservation);

server.get("/api/v1/reservations", getReservation);
server.get("/api/v1/reservations/:id", getSingleBooking);

server.listen(PORT, () => console.log("I am listening to PORT", PORT));
