import { getDB } from "../utils/db.js";
import { createToken } from "../utils/token.js";

// configuration options for HTTP cookies used to store authentification token
const cookieConfig = {
	httpOnly: true,
	secure: true,
	sameSite: "none",
};

const COL = "user";

// register a new user
export const register = async (req, res) => {
	console.log(req.body);

	if (await checkMail(req.body.email)) {
		//get database connection
		const db = await getDB();
		// insert the request body into the user collection of the database
		const result = await db.collection(COL).insertOne(req.body);
		// return the result of the database insertion as JJSON
		res.json({ message: "You successfully registered" });
	} else {
		return res
			.status(400)
			.json({ message: "Sorry but this email is already in use" });
	}
};

// funtion a authentification of a use
export const login = async (req, res) => {
	console.log(req.body);
	//get a database connection
	const db = await getDB();
	// fing the user in the 'user' collection with the specified 'user' and password properties
	const user = await db
		.collection(COL)
		.findOne({ email: req.body.email, pwd: req.body.pwd });
	// if use does not exist in the database send 401 Unauthorized status code and respond
	console.log(user);
	if (user === null) {
		res.status(401).json({ message: "Invalid email or password" });
		// if the user exists in the database create an authentification token and send it to the client in an HTTP cookie
	} else {
		console.log(user);
		// create an authentification token using the createtoken function
		//and the dbUser object returned to the database
		const token = createToken(user);
		// set an HTTP cookie with the name 'token' and the
		// authentification token as ist value, using the 'cookieConfig' options
		res.cookie("token", token, cookieConfig);
		// end the response
		res.json({ message: "You logged in successfully" });
	}
};

const checkMail = async (email) => {
	// make connection to DB
	const db = await getDB();
	//check if user email exists
	const user = await db.collection(COL).findOne({ email });
	// if there is none then return true else false
	if (user == null) {
		return true;
	} else {
		return false;
	}
};
