import { createHmac } from "crypto";
import { verifyToken } from "../utils/token.js";
import { getDB } from "../utils/db.js";

// hash user's password before storing it in the database
export const encryptPWD = (req, _, next) => {
	console.log("Encrypting Password");

	// delete cpwd key from the request body as it has been confirmed
	delete req.body.cpwd;

	// create hash of the pwd key using the createHmac method from the crypto module
	const hmac = createHmac("sha256", req.body.pwd);
	req.body.pwd = hmac.digest("hex");

	// pass control to the next middleware in the chain
	next();
};

// verify JWT stored in the token cookie of the incoming request
export const verifyJWTCookie = (req, res, next) => {
	// get token from the cookie
	const token = req.cookies.token;
	try {
		// verify token using the verifyToken function from  token.js
		const claim = verifyToken(token);
		req.claim = claim;

		// Logs the claim to the console
		console.log("OUR CLAIM:", req.claim);

		// pass control to the next middleware in the chain
		next();
	} catch (err) {
		// send  401 Unauthorized response if token is invalid
		console.error(err.message);
		res.status(401).end();
	}
};

// Validate that the password and confirm password fields in the request body match
export const validatePassword = (req, res, next) => {
	const pwd = req.body.pwd;
	const cpwd = req.body.cpwd;

	// send 400 Bad Request response if the passwords do not match
	if (pwd !== cpwd) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	// pass control to the next middleware in the chain
	next();
};
