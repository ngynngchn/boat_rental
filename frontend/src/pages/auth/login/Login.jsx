import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

import logo from "../../../assets/logo.svg";
import { useRef, useState } from "react";
import Button from "../../../components/basic/Button";

import toast, { Toaster } from "react-hot-toast";

function Login() {
	const [requestCode, setRequestCode] = useState(false);

	const codeRef = useRef();

	const navigate = useNavigate();
	const url = import.meta.env.VITE_BACKEND;
	const apiV = import.meta.env.VITE_API_VERSION;

	//* LOGIN WITH PASSWORD with Toasties
	const login = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const fetchToken = fetch(url + apiV + "/login", {
			method: "POST",
			credentials: "include",
			body: form,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid email or password");
				} else {
					return response.json();
				}
			})
			.then((data) => {
				localStorage.setItem("mailToken", data.token);
				setRequestCode(true);
			})
			.catch((error) => {
				console.error(error);
				throw new Error();
			});

		await toast.promise(fetchToken, {
			loading: "Verifying Credentials...",
			success: "Successful",
			error: (err) => {
				console.error(err);
				return "Login failed.";
			},
		});
	};
	//* LOGIN WITHOUT TOASTIES
	const login2 = async (e) => {
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
					<Toaster position="top-center" />
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
					<Toaster
						position="top-center"
						toastOptions={{ style: { fontFamily: "Barlow Reg" } }}
					/>
				</>
			)}
		</div>
	);
}

export default Login;
