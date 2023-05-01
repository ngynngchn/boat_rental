import { getDB } from "../utils/db.js";
import { sendMail } from "../utils/mail.js";
import {
	createMailToken,
	createToken,
	verifyMailToken,
} from "../utils/token.js";

// configuration options for HTTP cookies used to store authentification token
const cookieConfig = {
	httpOnly: true,
	secure: true,
	sameSite: "none",
};

const COL = "user";

// register a new user
export const register = async (req, res) => {
	// console.log(req.body);

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

// funtion for the authentification of a user
//* Regular login
export const login = async (req, res) => {
	// console.log(req.body);
	//get a database connection
	const db = await getDB();
	// fing the user in the 'user' collection with the specified 'user' and password properties
	const user = await db
		.collection(COL)
		.findOne({ email: req.body.email, pwd: req.body.pwd });
	// if user does not exist in the database send 401 Unauthorized status code and respond
	console.log(user);
	if (user === null) {
		res.status(401).json({ message: "Invalid email or password" });
		// if the user exists in the database create an authentification token and send it to the client in an HTTP cookie
	} else {
		// console.log(user);
		// create an authentification token using the createtoken function
		//and the dbUser object returned to the database
		const token = createToken(user);
		// set an HTTP cookie with the name 'token' and the
		// authentification token as ist value, using the 'cookieConfig' options
		res.cookie("token", token, cookieConfig);
		// end the response
		// res.redirect(process.env.VITE_FRONTEND + "/dashboard");
		res.json({ message: "You logged in successfully" });
	}
};

//*  Login via TFA
export const tfaLogin = async (req, res) => {
	try {
		const db = await getDB();
		// find user in database by looking for the user information
		const user = await db
			.collection(COL)
			.findOne({ email: req.body.email, pwd: req.body.pwd });
		if (user === null) {
			// if user is not fount return a message concernin invalid credentials
			return res.status(401).json({ message: "Invalid email or password" });
			// res.sendStatus(401);
			// throw new Error();
		} else {
			// if user is found, use the user information to create a mail token
			const mailToken = createMailToken(user);
			// the mailtoken.code will be send to the user
			sendMail(user.email, mailToken.code);
			// and the client receives the token that is supposed to be saved in the browsers localstorage
			res.status(200).json({ token: mailToken.token, message: "ALL GOOD!" });
		}
	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};

// function to clear the token cookie and log the user out
export const logout = (req, res) => {
	// clear the 'token' cookie by setting it to an empty string
	res.cookie("token", "", { maxAge: 0 });
	// send a success message to the client
	res.json({ message: "You have been logged out" });
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

export const verifyTFACode = (req, res) => {
	console.log(req.body);
	const mailToken = req.headers["authorization"].split(" ")[1];
	const code = req.body.code;
	console.log(mailToken, code);
	try {
		const claim = verifyMailToken(mailToken, code);
		console.log(claim);
		const token = createToken({ user: claim.user });
		res.cookie("token", token, cookieConfig);
		res.end();
	} catch (err) {
		console.error(err);
		res.status(401).end();
	}
};
