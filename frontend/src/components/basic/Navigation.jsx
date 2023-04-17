import React from "react";
import { Link } from "react-router-dom";
import "./Basic.scss";

function Navigation() {
	return (
		<nav>
			<Link to="/dashboard">DASHBOARD</Link>
			<Link to="/boats">BOATS</Link>
			<Link to="/reservations">RESERVATIONS</Link>
		</nav>
	);
}

export default Navigation;
