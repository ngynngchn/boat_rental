import React from "react";
import "./Boats.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../components/basic/Button";
function BoatForm() {
	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;

	const navigate = useNavigate();

	const addData = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		try {
			const response = await fetch(url + endpoint, {
				method: "POST",
				body: form,
			});
			console.log(response);
		} catch (err) {
			console.log("Something did not work", err);
		}
		navigate("/boats");
		// e.target.reset()
	};

	return (
		<div className="BoatForm">
			<h1> NEW BOAT</h1>
			<Button onClick={() => navigate(-1)} children color="#A2D2FF">
				GO BACK
			</Button>

			<form onSubmit={addData}>
				<label htmlFor="name">BOAT NAME</label>
				<input type="text" name="name" id="name" />
				<label htmlFor="year">BUILD YEAR</label>
				<input type="text" name="year" id="year" />
				<label htmlFor="ship-builder">SHIP BUILDER </label>
				<input type="text" name="ship-builder" id="ship-builder" />
				<label htmlFor="serialNo">SERIAL NO.</label>
				<input type="text" name="serialNo" id="serialNo" />
				<label htmlFor="Type">BOAT TYPE</label>
				<select name="type" id="type">
					<option value="Pedal boat">Pedal boat</option>
					<option value="Sailboat">Sailboat</option>
					<option value="Hovercraft">Hovercraft</option>
					<option value="Ghost ship">Ghost ship</option>
					<option value="Container ship">Container ship</option>
					<option value="Yacht">Yacht</option>
					<option value="House Boat">House Boat</option>
				</select>

				<label htmlFor="pic">Upload a picture</label>
				<input type="file" name="pic" id="pic" />
				<input type="submit" value="ADD NEW BOAT" />
			</form>
		</div>
	);
}

export default BoatForm;
