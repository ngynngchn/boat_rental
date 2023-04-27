import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "916f1c68ce971b",
		pass: "47c226fb84035d",
	},
});
export const sendMail = (address, content) => {
	var message = {
		from: "sender@server.com",
		to: address,
		subject: "Your Login Code",
		text: "Login Code",
		html: `<h1>${content}</h1`,
	};

	transport.sendMail(message, (err, info) => {
		if (err) {
			console.error("Error occurred while sending email:", err);
			return;
		} else {
			console.log("Email sent successfully:", info);
		}
	});
};
