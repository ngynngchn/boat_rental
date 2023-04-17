import React from "react";

function StatusTag({ content }) {
	return (
		<div className={content == "FREE" ? "free status" : "reserved status"}>
			{content}
		</div>
	);
}

export default StatusTag;
