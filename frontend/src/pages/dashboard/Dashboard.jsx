import { useEffect, useState } from "react";
import "./Dashboard.scss";
import Card from "../../components/Card";

function Dashboard() {
	const [count, setCount] = useState({ boats: 0, reservations: 0 });

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;
	console.log(url + endpoint);

	useEffect(() => {
		const getCount = async () => {
			const response = await fetch(url + endpoint + "-total");
			const data = await response.json();
			console.log(data);
			setCount({ boats: data });
		};
		getCount();
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
