import { useEffect, useState } from "react";
import Button from "./basic/Button";
function DetailsFrame({ details, removeEvent, editEvent }) {
	const url = import.meta.env.VITE_BACKEND;
	const [boatData, setBoatData] = useState();

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(url + `/api/v1/boats/${details.boat}`);
			const data = await response.json();
			setBoatData(data);
		};
		getData();
	}, []);

	if (!boatData) return;

	return (
		<div className="DetailsFrame">
			<img src={url + "/" + boatData.pic} alt={boatData.name} />
			<div className="container">
				<div className="actions">
					<Button
						color="var(--primary-col)"
						children
						onClick={() => navigate(-1)}>
						GO BACK
					</Button>
				</div>

				<div className="actions">
					<Button color="var(--danger-col)" children onClick={removeEvent}>
						REMOVE
					</Button>
					<Button color="#75bd9a" children onClick={editEvent}>
						EDIT
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DetailsFrame;
