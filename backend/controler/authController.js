import { getDB } from "../utils/db";
import { createToken } from "../utils/token";

// configuration options for HTTP cookies used to store authentification token
const cookieConfig = {
	httpOnly: true,
	secure: true,
	sameSite: none,
};

const COL = "user";

// Middleware function for registerung a new user
export const register = async (req, res) => {
	console.log(req.body);
	// get database connection
	const db = await getDB();
	// insert the request body into the user collection of the database
	const result = await db.collection(COL).insertOne(req.body);
	// return the result of the database insertion as JJSON
	res.json(result);
};

//Middleware funtion a authentification of a use
export const login = async (req, res) => {
	//get a database connection
	const db = getDB();
	// fing the user in the 'user' collection with the specified 'user' and password properties
	const dbUser = await db
		.collection(COL)
		.findOne({ user: req.body.user, password: req.body.password });
	// if use does not exist in the database send 401 Unauthorized status code and respond
	if (dbUser === null) {
		res.status(401).end();
		// if the user exists in the database create an authentification token and send it to the client in an HTTP cookie
	} else {
		console.log(dbUser);
		// create an authentification token using the createtoken function
		//and the dbUser object returned to the database
		const token = createToken(dbUser);
		// set an HTTP cookie with the name 'token' and the
		// authentification token as ist value, using the 'cookieConfig' options
		res.cookie("token", token, cookieConfig);
		// end the response
		res.end();
	}
};
