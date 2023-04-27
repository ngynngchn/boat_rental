import { useEffect, useState } from "react";
import "./Dashboard.scss";

import Card from "../../components/Card";

function Dashboard() {
	const [count, setCount] = useState({ boats: 0, reservations: 0 });
	const [date, setDate] = useState(new Date());

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;

	const getData = async () => {
		try {
			const [boatsResponse, reservationsResponse] = await Promise.all([
				fetch(url + endpoint + "-total", {
					credentials: "include",
				}),
				fetch(url + "/api/v1/reservations-total", {
					credentials: "include",
				}),
			]);

			const [boatsData, reservationsData] = await Promise.all([
				boatsResponse.json(),
				reservationsResponse.json(),
			]);
			setCount({
				boats: boatsData,
				reservations: reservationsData,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<h1>DASHBOARD</h1>
			<h2>Welcome back! </h2>
			<div className="actions">
				<h3>TODAY: {new Intl.DateTimeFormat("en-GB").format(date)} </h3>
			</div>
			<div className="Dashboard">
				<Card title="Total amount of boats" amount={count.boats} />
				<Card
					title="Total amount of reservations"
					amount={count.reservations}
				/>
				<Card title="Available boats for today" />
			</div>
			<h3>TODAYS RESERVATIONS:</h3>
		</>
	);
}

export default Dashboard;
