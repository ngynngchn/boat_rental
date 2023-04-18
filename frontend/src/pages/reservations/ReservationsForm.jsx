import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { v4 as uuid4 } from "uuid";
import { addDays, subDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "./Reservations.scss";

import Button from "../../components/basic/Button";
import BoatRows from "../../components/boats/BoatRows";

function ReservationsForm() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [boats, setBoats] = useState([]);
	const [selectedID, setSelected] = useState();
	const [excludeDate, setExcludedDates] = useState([]);

	const selectRef = useRef();
	const navigate = useNavigate();

	console.log(startDate.toLocaleString("en-GB"));

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;
	const post = "/api/v1/reservations";

	// console.log(
	// 	startDate.toLocaleString("en-GB"),
	// 	endDate.toLocaleString("en-GB")
	// );
	console.log(startDate);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("clicked");
		const form = new FormData(e.target);

		let newForm = {
			name: form.get("name"),
			email: form.get("email"),
			boat: form.get("boat"),
			notes: form.get("notes"),
			date: {
				startDate: startDate,
				endDate: endDate,
			},
			status: form.get("status"),

			// startDate: startDate.toLocaleString("en-GB").split(",")[0],
			// endDate: endDate.toLocaleString("en-GB").split(",")[0],
		};
		try {
			const response = await fetch(url + post, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newForm),
			});
			// console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetch(url + endpoint);
				const data = await result.json();
				// console.log(data);
				setBoats(data);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, []);

	return (
		<div className="ReservationsForm">
			<h1>New Reservation</h1>
			<Button onClick={() => navigate(-1)} children color="#A2D2FF">
				GO BACK
			</Button>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">NAME</label>
				<input type="text" name="name" id="name" />
				<label htmlFor="contatn">EMAIL</label>
				<input type="email" name="email" id="email" />
				<div className="datepicker">
					<label>STARTING DATE</label>
					<label>END DATE</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						// excludeDateIntervals={[
						// 	{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
						// ]}
					/>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						// excludeDateIntervals={[
						// 	{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
						// ]}
					/>
				</div>
				<label htmlFor="boat">BOAT NAME</label>
				<select
					name="boat"
					id="boat"
					ref={selectRef}
					onChange={() => setSelected(selectRef.current.value)}>
					{boats?.map((boat) => (
						<option value={boat["_id"]} key={uuid4()}>
							{boat.name}
						</option>
					))}
				</select>
				<label htmlFor="status">STATUS</label>
				<select name="status" id="status">
					<option value="PAID">PAID</option>
					<option value="OPEN">OPEN</option>
				</select>
				<label htmlFor="notes">NOTES</label>
				<textarea name="notes" id="notes" cols="30" rows="4"></textarea>
				<input type="submit" value="ADD A RESERVATION" />
			</form>

			<div className="container">
				{boats?.map((boat) =>
					boat["_id"] === selectedID ? (
						<BoatRows boat={boat} selected key={uuid4()} />
					) : (
						<BoatRows boat={boat} key={uuid4()} />
					)
				)}
			</div>
		</div>
	);
}

export default ReservationsForm;
