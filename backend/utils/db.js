//Import the required modules
import { MongoClient } from "mongodb";

// Get the MongoDB URI and database name from environment variables
const URI = process.env.MONGO_URI;
const DB = process.env.MONGO_DB;

// Create a new MongoClient instance using the URI
const client = new MongoClient(URI);

// Create a variable to store the database connection
let db;

// Define an async function that returns a connection to the database
export const getDB = async () => {
	// If a connection already exists, return it
	if (db) {
		return db;
	} else {
		// Otherwise, connect to the database and store the connection in the `db` variable
		await client.connect();
		db = client.db(DB);
		return db;
	}
};
