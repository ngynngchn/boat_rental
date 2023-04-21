import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
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
import {
	encryptPWD,
	validatePassword,
	verifyJWTCookie,
} from "./middleware/authMiddleware.js";
import { login, register } from "./controler/authController.js";

const server = express();
const PORT = process.env.PORT;
const origin = process.env.VITE_FRONTEND;

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ origin: true, credentials: true }));
server.use(cookieParser());

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

// // cookie setzten
// server.get("/test", (req, res) => {
// 	res.cookie("TEST", "YOUR TEST COOKIE");
// 	res.status(200).send("ALL GOOD");
// });

// server.get("/cookie", (req, res) => {
// 	console.log(req.cookies);
// 	res.end();
// });

//register
server.post("/register", upload.none(), validatePassword, encryptPWD, register);

//login
server.post("/login", upload.none(), encryptPWD, login);

//validation
server.get("/api/v1/validate", verifyJWTCookie, (req, res) => res.end());

server.listen(PORT, () => console.log("I am listening to PORT", PORT));
