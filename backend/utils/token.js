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
