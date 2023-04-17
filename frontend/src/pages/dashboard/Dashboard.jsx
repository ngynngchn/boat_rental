import React from "react";

import "./Dashboard.scss";
import Card from "../../components/Card";

function Dashboard() {
	return (
		<div className="Dashboard">
			<h1>DASHBOARD</h1>
			<Card title="Available boats" amount="15" />
			<Card title="Reservations" amount="35" />
			<Card title="Total amount of boats" amount="50" />
		</div>
	);
}

export default Dashboard;
