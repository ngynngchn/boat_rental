import React, { useEffect, useState } from "react";
import StatusTag from "../basic/StatusTag";
import { Link, useNavigate } from "react-router-dom";

function ReservationCard({ name, date, id, status, _id, boat }) {
	const navigate = useNavigate();
	const [ship, setShip] = useState();
	const url = import.meta.env.VITE_BACKEND;

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(url + `/api/v1/boats/${boat}`, {
				credentials: "include",
			});
			const data = await response.json();
			setShip(data);
		};
		getData();
	}, []);

	if (!ship) return;

	return (
		<div
			className="ReservationCard"
			onClick={() => navigate(`/reservations/${_id}`)}>
			<h4>{id?.toString().padStart(2, 0)}</h4>
			<h3>{name}</h3>
			<h5>
				{/* <Link to={`/boats/${boat}`}> */}
				{ship.name} <span>{ship.boatID}</span>
				{/* </Link> */}
			</h5>
			<p>{date}</p>
			<StatusTag content={status} />
		</div>
	);
}

export default ReservationCard;
