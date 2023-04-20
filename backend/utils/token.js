import jwt from "jsonwebtoken";

export const createToken = (user) => {
	const token = jwt.sign({ user: user["_id"] }, process.env.JWT_SECRET, "1h");
	return token;
};
