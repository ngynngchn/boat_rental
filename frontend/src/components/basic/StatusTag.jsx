import React from "react";

function StatusTag({ content }) {
	return (
		<div
			className={
				content == "FREE" || "PAID" ? "free status" : "reserved status"
			}>
			{content}
		</div>
	);
}

export default StatusTag;
