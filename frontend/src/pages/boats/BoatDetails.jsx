import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Boats.scss";
import Button from "../../components/basic/Button";
import DetailsFrame from "../../components/DetailsFrame";

function BoatDetails() {
	const [details, getDetails] = useState();
	const [editable, setEditable] = useState(false);

	const navigate = useNavigate();
	const params = useParams();
	const formRef = useRef();

	const url = import.meta.env.VITE_BACKEND;
	const endpoint = import.meta.env.VITE_ENDPOINT;

	const remove = async () => {
		try {
			const response = await fetch(url + endpoint + "/" + params.id, {
				method: "DELETE",
				credentials: "include",
			});
			if (!response.ok) return err;
			else {
				navigate("/boats");
				return response.json();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const edit = () => {
		formRef.current.removeAttribute("inert", "true");
		setEditable(true);
	};

	useEffect(() => {
		const getData = async () => {
			const result = await fetch(url + endpoint + "/" + params.id, {
				credentials: "include",
			});
			const data = await result.json();
			getDetails(data);
		};
		getData();
	}, []);

	if (!details) return;

	return (
		<div className="BoatDetails">
			<h1>{details.name}</h1>
			<img src={url + "/" + details.pic} alt={details.name} />
			<div>
				<div className="actions">
					<Button
						color="var(--primary-col)"
						children
						onClick={() => navigate(-1)}>
						GO BACK
					</Button>
				</div>
				<form inert="true" ref={formRef}>
					<label htmlFor="name">BOAT NAME</label>
					<input
						type="text"
						name="name"
						id="name"
						defaultValue={details.name}
					/>
					<label htmlFor="year">BUILD YEAR</label>
					<input
						type="text"
						name="year"
						id="year"
						defaultValue={details.year}
					/>
					<label htmlFor="ship-builder">SHIP BUILDER </label>
					<input
						type="text"
						name="ship-builder"
						id="ship-builder"
						defaultValue={details["ship-builder"]}
					/>
					<label htmlFor="serialNo">SERIAL NO.</label>
					<input
						type="text"
						name="serialNo"
						id="serialNo"
						defaultValue={details.serialNo}
					/>
					<label htmlFor="Type">BOAT TYPE</label>
					<select name="type" id="type">
						<option value="Pedal boat">Pedal boat</option>
						<option value="Sailboat">Sailboat</option>
						<option value="Hovercraft">Hovercraft</option>
						<option value="Ghost ship">Ghost ship</option>
						<option value="Container ship">Container ship</option>
						<option value="Yacht">Yacht</option>
					</select>

					{editable && (
						<div>
							<label htmlFor="pic">Change picture</label>
							<input type="file" name="pic" id="pic" />
						</div>
					)}

					{/* <input type="submit" value="ADD NEW BOAT" /> */}
				</form>
				<div className="actions">
					<Button color="var(--danger-col)" children onClick={remove}>
						REMOVE
					</Button>
					<Button color="#75bd9a" children onClick={edit}>
						EDIT
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BoatDetails;
