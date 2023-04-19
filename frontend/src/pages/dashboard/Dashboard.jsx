import { useEffect, useState } from "react";
import "./Dashboard.scss";
import Card from "../../components/Card";

function Dashboard() {
	const [count, setCount] = useState({ boats: 0, reservations: 0 });

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;
	console.log(url + endpoint);

	const getData = async () => {
		try {
			const [boatsResponse, reservationsResponse] = await Promise.all([
				fetch(url + endpoint + "-total"),
				fetch(url + "/api/v1/reservations" + "-total"),
			]);

			const [boatsData, reservationsData] = await Promise.all([
				boatsResponse.json(),
				reservationsResponse.json(),
			]);

			console.log(boatsData, reservationsData);

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
			<div className="Dashboard">
				<Card title="Total amount of boats" amount={count.boats} />
				<Card title="Reservations" amount={count.reservations} />
			</div>
		</>
	);
}

export default Dashboard;
