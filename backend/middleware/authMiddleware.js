import { createHmac } from "crypto";

export const encryptPWD = (req, res, next) => {
	console.log("In Middleware");
	const hmac = createHmac("sha256", req.body.password);
	req.body.password = hmac.digest("hex");
	next();
};
