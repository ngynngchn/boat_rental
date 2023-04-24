import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid4 } from "uuid";

import DatePicker from "react-datepicker";

import DetailsFrame from "../../components/DetailsFrame";

function ReservationsDetail() {
	const [details, getDetails] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [selectedID, setSelectedID] = useState();

	const [boats, setBoats] = useState([]);

	const navigate = useNavigate();
	const params = useParams();

	const selectRef = useRef();
	const formRef = useRef();

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = "/api/v1/reservations/";

	const remove = async () => {
		try {
			const response = await fetch(url + endpoint + params.id, {
				method: "DELETE",
				credentials: "include",
			});
			if (!response.ok) return err;
			else {
				navigate("/reservations");
				return response.json();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const edit = () => {
		formRef.current.removeAttribute("inert", "true");
	};

	// get informatin about reservation

	useEffect(() => {
		const getData = async () => {
			const result = await fetch(url + endpoint + params.id, {
				credentials: "include",
			});
			const data = await result.json();
			getDetails(data);
			setStartDate(new Date(data.date.startDate));
			setEndDate(new Date(data.date.endDate));
			setSelectedID(data.boat);
		};
		getData();
	}, []);

	// get boat details to display boat open options
	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetch(url + import.meta.env.VITE_ENDPOINT, {
					credentials: "include",
				});
				const data = await result.json();
				setBoats(data);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, []);
	console.log(boats);

	if (!details && boats) return;

	return (
		<div className="ReservationDetails">
			<h1>{details.name}</h1>
			<DetailsFrame
				details={details}
				removeEvent={remove}
				editEvent={edit}
				children>
				<form ref={formRef} inert="true">
					<label htmlFor="name">NAME</label>
					<input
						type="text"
						name="name"
						id="name"
						defaultValue={details.name}
					/>
					<label htmlFor="contatn">EMAIL</label>
					<input
						type="email"
						name="email"
						id="email"
						defaultValue={details.email}
					/>
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
						defaultValue={selectedID}
						onChange={() => setSelectedID(selectRef.current.value)}>
						<option disabled value="">
							Select a boat
						</option>
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
					<textarea
						name="notes"
						id="notes"
						cols="30"
						rows="4"
						defaultValue={details.notes}></textarea>
					{/* <input type="submit" value="ADD A RESERVATION" /> */}
				</form>
			</DetailsFrame>
		</div>
	);
}

export default ReservationsDetail;
