import { useState } from "react";
import "./BoatRows.scss";
import { Link } from "react-router-dom";

function BoatRows({ boat, selected, onclick }) {
	const url = import.meta.env.VITE_BACKEND + "/" + boat.pic;

	return (
		<div
			className={selected ? "BoatRows selected" : "BoatRows"}
			onClick={onclick}>
			<img
				className="ship"
				src={url}
				alt={boat.name}
				height="100px"
				width="100px"
			/>
			<div className="info">
				<h3>{boat.name}</h3>
				<h5>{boat.type}</h5>
				<h5>{boat.year}</h5>
				<Link to={`/boats/${boat["_id"]}`}>Read more</Link>
			</div>
			<h4>{boat.boatID}</h4>
		</div>
	);
}

export default BoatRows;
