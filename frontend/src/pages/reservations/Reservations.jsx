import ReservationCard from "../../components/reservations/ReservationCard";
import AddButton from "../../components/basic/AddButton";
import "./Reservations.scss";

import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";

function Reservations() {
	const [bookings, setBookings] = useState([]);
	const url = import.meta.env.VITE_BACKEND + "/api/v1/reservations";

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(url, {
				credentials: "include",
			});
			const data = await response.json();
			console.log(data);
			setBookings(data);
		};
		getData();
	}, []);

	if (!bookings) return;

	return (
		<>
			<h1>Reservations</h1>
			<div className="Reservation">
				<AddButton
					content=" + ADD A RESERVATION"
					link="reservations/add-reservation"
				/>
				<div className="container">
					<div className="header">
						<h6>Reservation No.</h6>
						<h6>Reserved by:</h6>
						<h6>Boat/Boat No.:</h6>
						<h6>Reservation Date</h6>
						<h6>Status</h6>
					</div>

					{bookings?.map((booking) => (
						<ReservationCard
							key={uuid4()}
							name={booking.name}
							id={booking.bookingID}
							_id={booking["_id"]}
							boat={booking.boat}
							date={
								new Date(booking.date.startDate)
									.toLocaleString("en-GB")
									.split(",")[0] +
								" - " +
								new Date(booking.date.endDate)
									.toLocaleString("en-GB")
									.split(",")[0]
							}
							status={booking.status}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default Reservations;
