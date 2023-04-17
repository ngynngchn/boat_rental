import "./utils/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import { addBoat, addReservation } from "./utils/helper.js";

const PORT = process.env.PORT;

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(process.env.VITE_FRONTEND));

const upload = multer({ dest: "uploads/" });
server.use("/uploads", express.static("./uploads"));

// boats
server.post("/api/v1/boats", upload.none(), addBoat);
// server.post("/api/v1/boats", upload.single("pic"), addBoat);

// reservations
server.post("/api/v1/reservations", addReservation);

server.listen(PORT, () => console.log("I am listening to PORT", PORT));
