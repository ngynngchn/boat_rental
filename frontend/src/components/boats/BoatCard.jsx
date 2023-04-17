import React from "react";
import { Icon } from "@iconify/react";
import StatusTag from "../basic/StatusTag";

function BoatCard({ name, year, type, id, status }) {
	return (
		<div className="BoatCard">
			<Icon className="ship" icon="ion:boat-outline" />
			<h4>{id}</h4>
			<h3>{name}</h3>
			<h5>
				{year} {type}
			</h5>
			<StatusTag content={status} />
		</div>
	);
}

export default BoatCard;
