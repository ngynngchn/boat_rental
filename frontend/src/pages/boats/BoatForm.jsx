import React from "react";

function BoatForm() {
	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;

	console.log(url + endpoint);

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
		// e.target.reset()
	};

	return (
		<div className="BoatForm">
			<h1> NEW BOAT</h1>

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
				</select>

				<label htmlFor="picture">Upload a picture</label>
				<input type="file" name="picture" id="picture" />
				<input type="submit" value="ADD NEW BOAT" />
			</form>
		</div>
	);
}

export default BoatForm;
