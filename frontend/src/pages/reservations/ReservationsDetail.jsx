import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DetailsFrame from "../../components/DetailsFrame";
function ReservationsDetail() {
	const [details, getDetails] = useState();

	const navigate = useNavigate();
	const params = useParams();
	const url = import.meta.env.VITE_BACKEND;
	const endpoint = "/api/v1/reservations";

	const remove = async () => {
		try {
			const response = await fetch(url + endpoint + "/" + params.id, {
				method: "DELETE",
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
	const edit = async () => {};

	useEffect(() => {
		const getData = async () => {
			const result = await fetch(url + endpoint + "/" + params.id);
			const data = await result.json();
			console.log(data);
			getDetails(data);
		};
		getData();
	}, []);

	if (!details) return;
	return (
		<div className="ReservationDetails">
			<h1>{details.name}</h1>
			<DetailsFrame details={details} removeEvent={remove} editEvent={edit} />
		</div>
	);
}

export default ReservationsDetail;
