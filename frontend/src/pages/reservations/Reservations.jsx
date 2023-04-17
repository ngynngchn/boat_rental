import React from "react";
import ReservationCard from "../../components/reservations/ReservationCard";
import AddButton from "../../components/basic/AddButton";
import "./Reservations.scss";

function Reservations() {
	return (
		<div className="Reservation">
			<h1>Reservations</h1>
			<AddButton
				content=" + ADD A RESERVATION"
				link="reservations/add-reservation"
			/>
			<div className="container">
				<div className="header">
					<h6>Boat/Boat No.:</h6>
					<h6>Reserved by:</h6>
					<h6>Reservation Date</h6>
					<h6>Reservation No.</h6>
				</div>
				<ReservationCard
					name="John Doe"
					shipname="The Atlanta"
					shipID="25"
					id="24"
					date="25.01.2023- 26.01.2023"
				/>
				<ReservationCard
					name="John Doe"
					shipname="The Atlanta"
					shipID="25"
					id="24"
					date="25.01.2023- 26.01.2023"
				/>
				<ReservationCard
					name="John Doe"
					shipname="The Atlanta"
					shipID="25"
					id="24"
					date="25.01.2023- 26.01.2023"
				/>
				<ReservationCard
					name="John Doe"
					shipname="The Atlanta"
					shipID="25"
					id="24"
					date="25.01.2023- 26.01.2023"
				/>
			</div>
		</div>
	);
}

export default Reservations;
