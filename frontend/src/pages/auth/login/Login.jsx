import { useNavigate } from "react-router-dom";
import "./Login.scss";

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
			<form onSubmit={login}>
				<label htmlFor="email">YOUR EMAIL:</label>
				<input type="email" name="email" required id="email" />
				<label htmlFor="pwd">PASSWORD:</label>
				<input type="password" name="pwd" required id="pwd" />
				<input type="submit" value="LOGIN" />
			</form>
		</div>
	);
}

export default Login;
