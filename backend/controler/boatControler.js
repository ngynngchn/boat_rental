import { ObjectId } from "mongodb";
import { getDB } from "../utils/db.js";

const COL = "boats";

export const addBoat = async (req, res) => {
	try {
		req.body.pic = req.file.path;
		req.body.status = "FREE";
		const db = await getDB();
		const length = await db.collection(COL).countDocuments();
		req.body.boatID = length + 1;
		const result = await db.collection(COL).insertOne(req.body);
		res.send("Added Boat");
	} catch (err) {
		console.error(err.message); // log the error message
		res.status(500).end();
	}
	// res.end;
};

export const getBoats = async (req, res) => {
	try {
		const db = await getDB();
		const result = await db.collection(COL).find().toArray();
		if (result === null) res.end();
		else {
			res.json(result);
		}
	} catch (err) {
		console.error(err.message); // log the error message
		res.status(500).end();
	}
};
export const getBoatCount = async (req, res) => {
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

export const getBoat = async (req, res) => {
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

export const deleteBoat = async (req, res) => {
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
