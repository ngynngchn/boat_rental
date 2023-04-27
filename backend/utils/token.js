// Import the JWT library
import jwt from "jsonwebtoken";

// Create a token using the user ID as the payload
export const createToken = (user) => {
	// Sign the token using the user ID as the payload, a secret key, and an expiration time of 1 hour
	const token = jwt.sign({ user: user["_id"] }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	// Return the token
	return token;
};

// Verify a token and return the decoded payload
export const verifyToken = (token) => {
	// Verify the token using the same secret key used to sign the token
	const result = jwt.verify(token, process.env.JWT_SECRET);
	// Return the decoded payload
	return result;
};

//! TFA via email

//*  MAIL TOKEN
// Create a token using the user ID das the payload
export const createMailToken = (user) => {
	// create 4-digit code as an additional signature to the secret key to sign the token
	const code = createCode();
	const token = jwt.sign(
		{ user: user._id },
		code + process.env.JWT_MAIL_SECRET,
		{
			expiresIn: "15m",
		}
	);
	// return the code and the token
	return { code, token };
};

export const verifyMailToken = (token, code) => {
	const result = jwt.verify(token, code + process.env.JWT_MAIL_SECRET);
	return result;
};

// Creata 4 - digit code to send to the user to verify
const createCode = () => {
	let code = "";
	for (let i = 0; i < 4; i++) {
		code += Math.floor(Math.random() * 9);
	}
	return code;
};
