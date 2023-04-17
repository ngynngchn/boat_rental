import { useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservations.scss";

function ReservationsForm() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	console.log(
		startDate.toLocaleString("en-GB"),
		endDate.toLocaleString("en-GB")
	);
	return (
		<div className="ReservationsForm">
			<h1>New Reservation</h1>
			<form>
				<label htmlFor="name">Name:</label>
				<input type="text" name="name" id="name" />
				<label>From:</label>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
				<label>to:</label>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
				<label htmlFor="boat">Boat:</label>
				<select name="boat" id="boat">
					<option value=""></option>
				</select>
			</form>
		</div>
	);
}

export default ReservationsForm;
