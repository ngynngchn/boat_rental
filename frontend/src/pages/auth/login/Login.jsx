import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

import logo from "../../../assets/logo.svg";
function Login() {
	const navigate = useNavigate();
	const url = import.meta.env.VITE_BACKEND;

	const login = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const result = await fetch(url + "/login", {
			method: "POST",
			credentials: "include",
			body: form,
		});
		const data = await result.json();
		console.log(data.message);
		navigate("/dashboard");
	};

	return (
		<div className="Login">
			<img src={logo} alt="logo" />
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
		</div>
	);
}

export default Login;
