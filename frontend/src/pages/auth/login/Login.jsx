import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

import logo from "../../../assets/logo.svg";
import { useRef, useState } from "react";
import Button from "../../../components/basic/Button";
function Login() {
	const [requestCode, setRequestCode] = useState(false);

	const codeRef = useRef();

	const navigate = useNavigate();
	const url = import.meta.env.VITE_BACKEND;
	const apiV = import.meta.env.VITE_API_VERSION;

	//* LOGIN WITH PASSWORD
	const login = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const result = await fetch(url + apiV + "/login", {
			method: "POST",
			credentials: "include",
			body: form,
		});
		// send credentials to backend and check wether password and user are valid
		if (result.ok) {
			const data = await result.json();
			// save mail token in browsers localstorage
			localStorage.setItem("mailToken", data.token);
			// toggle to Code Input for login
			setRequestCode(true);
			console.log(data.message);
		}
		// navigate("/dashboard");
	};

	//* LOGIN WITH CODE

	const verifyCode = async () => {
		const token = localStorage.getItem("mailToken");
		const response = await fetch(url + apiV + "/verify-code", {
			method: "POST",
			credentials: "include",
			headers: {
				"content-type": "application/json",
				authorization: "Bearer " + token,
			},
			body: JSON.stringify({ code: codeRef.current.value }),
		});

		if (response.ok) {
			console.log("Everthing okay, welcome back!");
			navigate("/dashboard");
		}
	};

	return (
		<div className="Login">
			<img src={logo} alt="logo" />
			{requestCode ? (
				<>
					<h3>Please enter your login code:</h3>
					<section className="code-container">
						<label htmlFor="code" hidden>
							LOGIN CODE:
						</label>
						<input
							type="text"
							name="code"
							id="code"
							ref={codeRef}
							placeholder="XXXX"
							maxLength="4"
						/>
						<Button onClick={verifyCode}>VERIFY CODE</Button>
					</section>
				</>
			) : (
				<>
					<h3>LOG IN TO YOUR ACCOUNT:</h3>
					<form onSubmit={login}>
						<label htmlFor="email">YOUR EMAIL:</label>
						<input type="email" name="email" required id="email" />
						<label htmlFor="pwd">PASSWORD:</label>
						<input type="password" name="pwd" required id="pwd" />
						<input type="submit" value="LOGIN" />
					</form>
					<h4>
						Don't have an account ? <Link to="/register">Sign Up!</Link>
					</h4>
				</>
			)}
		</div>
	);
}

export default Login;
