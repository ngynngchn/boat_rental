import { getDB } from "./db.js";

const COL = "boats";

export const addBoat = async (req, res) => {
	// console.log(req.file);
	console.log(req.body);
	// try {
	// 	const db = await getDB();
	// 	const response = await db.collection(COL).insertOne();
	// } catch (err) {
	// 	res.status(500).end();
	// }
	res.end;
};
export const addReservation = async (req, res) => {};
