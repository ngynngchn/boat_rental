import React from "react";

function ReservationCard({ name, date, shipname, shipID, id }) {
	return (
		<div className="ReservationCard">
			<h5>
				{shipname} <span>{shipID}</span>
			</h5>
			<h3>{name}</h3>
			<p>{date}</p>
			<h4>{id}</h4>
		</div>
	);
}

export default ReservationCard;
