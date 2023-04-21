import "./Register.scss";

import React, { useRef, useState } from "react";

function Register() {
	const url = import.meta.env.VITE_BACKEND;

	const [matched, setMatched] = useState(true);

	const cpwdRef = useRef(null);
	const pwdRef = useRef(null);

	const checkMatch = () => {
		if (pwdRef.current.value !== cpwdRef.current.value) {
			setMatched(false);
		} else {
			setMatched(true);
		}
	};
	const handlePwdChange = () => {
		if (pwdRef.current.value !== cpwdRef.current.value) {
			setMatched(false);
		} else {
			setMatched(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (matched) {
			try {
				const form = new FormData(e.target);

				const result = await fetch(url + "/register", {
					method: "POST",
					body: form,
				});
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="Register">
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">YOUR USERNAME:</label>
				<input type="text" name="username" required id="username" />
				<label htmlFor="email">YOUR EMAIL:</label>
				<input type="email" name="email" required id="email" />
				<label htmlFor="pwd">PASSWORD:</label>

				<input
					type="password"
					name="pwd"
					required
					id="pwd"
					ref={pwdRef}
					onChange={handlePwdChange}
				/>
				<label htmlFor="pwd">CONFIRM PASSWORD:</label>
				<input
					type="password"
					name="cpwd"
					id="cpwd"
					ref={cpwdRef}
					onChange={checkMatch}
				/>
				{!matched && <p>Sorry, but your passwords don't match!</p>}
				<input type="submit" value="REGISTER" disabled={!matched} />
			</form>
		</div>
	);
}

export default Register;
