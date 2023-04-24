import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import "./Boats.scss";

import AddButton from "../../components/basic/AddButton";
import BoatCard from "../../components/boats/BoatCard";

function Boats() {
	const [allBoats, setAllBoats] = useState([]);
	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(url + endpoint, { credentials: "include" });

			const data = await response.json();
			setAllBoats(data);
		};
		getData();
	}, []);

	return (
		<div className="Boats">
			<h1>Boats</h1>
			<AddButton content="+ ADD A BOAT" link="boats/add-boat" />
			{/* <input type="search" name="" id="" />
			<select name="status" id="status">
				<option value="free">FREE</option>
				<option value="reserved">RESERVED</option>
			</select> */}
			<div className="container">
				{allBoats?.map((boat) => (
					<BoatCard {...boat} key={uuid4()} />
				))}
			</div>
		</div>
	);
}

export default Boats;
