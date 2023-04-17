import React from "react";
import "./Boats.scss";
import AddButton from "../../components/basic/AddButton";
import BoatCard from "../../components/boats/BoatCard";
function Boats() {
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
				<BoatCard
					name="The Atlanta"
					year="2010"
					type="Yacht"
					id="12"
					status="RESERVED"
				/>
				<BoatCard
					name="The Atlanta"
					year="2010"
					type="Yacht"
					id="12"
					status="FREE"
				/>
				<BoatCard
					name="The Atlanta"
					year="2010"
					type="Yacht"
					id="12"
					status="FREE"
				/>
				<BoatCard
					name="The Atlanta"
					year="2010"
					type="Yacht"
					id="12"
					status="FREE"
				/>
			</div>
		</div>
	);
}

export default Boats;
