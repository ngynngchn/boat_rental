import React from "react";
import "./Basic.scss";

function Button({ color = "var(--primary-col)", children, onClick }) {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: color }}
			className="Button"
			type="button">
			{children}
		</button>
	);
}

export default Button;
