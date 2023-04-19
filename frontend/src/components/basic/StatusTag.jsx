import React from "react";

function StatusTag({ content }) {
	console.log(content == "FREE");
	return (
		<div
			className={
				content == "FREE" || content == "PAID"
					? "free status"
					: "reserved status"
			}>
			{content}
		</div>
	);
}

export default StatusTag;
