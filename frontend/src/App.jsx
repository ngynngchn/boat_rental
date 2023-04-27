import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Boats from "./pages/boats/Boats";
import BoatForm from "./pages/boats/BoatForm";
import Reservations from "./pages/reservations/Reservations";
import BoatDetails from "./pages/boats/BoatDetails";
import ReservationsForm from "./pages/reservations/ReservationsForm";
import ReservationsDetail from "./pages/reservations/ReservationsDetail";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Protected from "./pages/auth/Protected";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Login />} />
					<Route element={<Protected />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/boats" element={<Boats />} />
						<Route path="/boats/:id" element={<BoatDetails />} />
						<Route path="/boats/add-boat" element={<BoatForm />} />

						<Route path="/reservations" element={<Reservations />} />
						<Route path="/reservations/:id" element={<ReservationsDetail />} />
						<Route
							path="/reservations/add-reservation"
							element={<ReservationsForm />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
