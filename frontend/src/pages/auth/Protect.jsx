import { Navigate, Outlet } from "react-router-dom";

function Protect() {
	const url = import.meta.env.VITE_BACKEND;

	const verify = () => {
		fetch(url + "/validate", {
			credentials: "include",
		}).then((res) => (res.ok ? false : true));
	};

	console.log("Authorized");

	if (verify()) return <Navigate to="/dashboard" replace />;
	return <Outlet />;
}

export default Protect;
