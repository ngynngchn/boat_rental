import React from "react";
import { Link } from "react-router-dom";
import "./Basic.scss";

import { NavLink } from "react-router-dom";
import Button from "./Button";

function Navigation() {
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
			<Button color="var(--primary-col)"> LOG OUT</Button>
		</nav>
	);
}

export default Navigation;
