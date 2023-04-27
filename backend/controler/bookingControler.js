import { ObjectId } from "mongodb";
import { getDB } from "../utils/db.js";
const COL = "bookings";

export const getReservation = async (req, res) => {
	console.log(req.body);
	try {
		const db = await getDB();
		const result = await db.collection(COL).find().toArray();
		// console.log(result);
		if (result === null) res.end();
		else {
			res.json(result);
		}
	} catch (err) {
		console.error(err.message); // log the error message
		res.status(500).end();
	}
};

export const getSingleBooking = async (req, res) => {
	console.log(req.params.id);
	try {
		const db = await getDB();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.params.id) });
		if (result === null) res.end();
		else {
			// console.log(result);
			res.json(result);
		}
	} catch (err) {
		console.error(err.message);
		res.send(500).end();
	}
};

export const getBookingsCount = async (req, res) => {
	try {
		const db = await getDB();
		const length = await db.collection(COL).countDocuments();
		// console.log(length);
		if (length === null) res.end();
		else {
			res.json(length);
		}
	} catch (err) {
		console.error(err.message); // log the error message
		res.status(500).end();
	}
};

export const addReservation = async (req, res) => {
	// res.end(/);
	try {
		const db = await getDB();
		const length = await db.collection(COL).countDocuments();
		req.body.bookingID = length + 1;
		// console.log(req.body);
		const result = await db.collection(COL).insertOne(req.body);
		// console.log(result);
		let reservation = {
			date: req.body.date,
			id: result.insertedId,
		};
		const boat = await db
			.collection("boats")
			.updateOne(
				{ _id: new ObjectId(req.body.boat) },
				{ $push: { reservations: reservation } }
			);
		console.log("INSERT", boat);
		if (result === null) res.end();
		else {
			res.json(result);
		}
	} catch (err) {
		console.error(err.message);
		res.send(500).end();
	}
};

export const deleteBooking = async (req, res) => {
	try {
		const db = await getDB();
		const response = await db
			.collection(COL)
			.deleteOne({ _id: new ObjectId(req.params.id) });
		if (response === null) res.end();
		else {
			res.json(response);
		}
	} catch (err) {
		console.error(err.message);
		res.send(500).end();
	}
};

export const editBooking = async () => {
	try {
		const db = getDB();
		const result = await db.collection(COL).replaceOne();
		if (response === null) res.end();
		else {
			res.json(response);
		}
	} catch (err) {
		console.error(err.message);
		res.send(500).end();
	}
};
