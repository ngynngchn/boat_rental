import React from "react";
import "./Basic.scss";

import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navigation() {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const navigate = useNavigate();
	const logout = async () => {
		try {
			const result = await fetch(url + "/logout", {
				method: "POST",
				credentials: "include",
			});
			const message = await result.json();
			console.log(message.message);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<nav>
			<NavLink to="/dashboard" activeclassname="active">
				Dashboard
			</NavLink>
			<NavLink to="/boats" activeclassname="active">
				Boats
			</NavLink>
			<NavLink to="/reservations" activeclassname="active">
				Reservations
			</NavLink>
			<Button onClick={logout} color="var(--primary-col)">
				{" "}
				LOG OUT
			</Button>
		</nav>
	);
}

export default Navigation;
