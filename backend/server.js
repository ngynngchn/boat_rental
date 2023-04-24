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
import { login, logout, register } from "./controler/authController.js";

const server = express();
const PORT = process.env.PORT;
const origin = process.env.VITE_FRONTEND;

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ origin: origin, credentials: true }));
server.use(cookieParser());

const upload = multer({ dest: "uploads/" });
server.use("/uploads", express.static("./uploads"));

// boats
server.post("/api/v1/boats", upload.single("pic"), verifyJWTCookie, addBoat);

server.get("/api/v1/boats", verifyJWTCookie, getBoats);

server.get("/api/v1/boats-total", verifyJWTCookie, getBoatCount);

server.get("/api/v1/boats/:id", verifyJWTCookie, getBoat);

server.delete("/api/v1/boats/:id", verifyJWTCookie, deleteBoat);

// reservations
server.post("/api/v1/reservations", verifyJWTCookie, addReservation);

server.get("/api/v1/reservations", verifyJWTCookie, getReservation);

server.get("/api/v1/reservations-total", verifyJWTCookie, getBookingsCount);
verifyJWTCookie,
	server.get("/api/v1/reservations/:id", verifyJWTCookie, getSingleBooking);
server.delete("/api/v1/reservations/:id", verifyJWTCookie, deleteBooking);

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
server.post(
	"/api/v1/register",
	upload.none(),
	validatePassword,
	encryptPWD,
	register
);

//login
server.post("/api/v1/login", upload.none(), encryptPWD, login);

// logout
server.post("/api/v1/logout", logout);

//validation
server.get("/api/v1/validate", verifyJWTCookie, (req, res) => {
	res.end();
});

server.listen(PORT, () => console.log("I am listening to PORT", PORT));
