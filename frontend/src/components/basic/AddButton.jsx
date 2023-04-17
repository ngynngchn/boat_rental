import { Link } from "react-router-dom";
import "./Basic.scss";
function AddButton({ content, link }) {
	return (
		<Link className="AddBtn" to={`/${link}`}>
			{content}
		</Link>
	);
}

export default AddButton;
