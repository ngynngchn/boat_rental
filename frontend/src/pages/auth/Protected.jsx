import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../components/basic/Navigation";

import logo from "../../assets/logo.svg";
import Background from "../../components/basic/Background";

function Protected() {
	const url = import.meta.env.VITE_BACKEND;
	const apiV = import.meta.env.VITE_API_VERSION;
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	const authenticate = async () => {
		try {
			const result = await fetch(url + apiV + "/validate", {
				credentials: "include",
			});
			if (!result.ok) {
				navigate("/", { replace: true });
			} else {
				setIsAuthenticated(true);
			}
		} catch (err) {
			console.log("Please log in", err);
		}
	};

	authenticate();
	return isAuthenticated ? (
		<div className="Protected">
			<div className="frame">
				<img src={logo} alt="Logo" width="75px" className="logo" />
				<Navigation />
				<Background>
					<Outlet />
				</Background>
			</div>
		</div>
	) : (
		<p>Is loading ...</p>
	);
}

export default Protected;
