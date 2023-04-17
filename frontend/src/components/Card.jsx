import React from "react";
import "./basic/Basic.scss";

function Card({ title, amount }) {
	return (
		<div className="Card">
			<h3>{title}</h3>
			<h4>{amount}</h4>
		</div>
	);
}

export default Card;
