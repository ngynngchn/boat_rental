import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Boats from "./pages/boats/Boats";
import BoatForm from "./pages/boats/BoatForm";
import Reservations from "./pages/reservations/Reservations";
import BoatDetails from "./pages/boats/BoatDetails";
import ReservationsForm from "./pages/reservations/ReservationsForm";
import ReservationsDetail from "./pages/reservations/ReservationsDetail";
import Navigation from "./components/basic/Navigation";
import Background from "./components/basic/Background";
import logo from "./assets/logo.svg";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="frame">
					<img src={logo} alt="Logo" width="75px" className="logo" />
					<Navigation />
					<Background>
						<Routes>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/boats" element={<Boats />} />
							<Route path="/boats/:id" element={<BoatDetails />} />
							<Route path="/boats/add-boat" element={<BoatForm />} />

							<Route path="/reservations" element={<Reservations />} />
							<Route
								path="/reservations/:id"
								element={<ReservationsDetail />}
							/>
							<Route
								path="/reservations/add-reservation"
								element={<ReservationsForm />}
							/>
						</Routes>
					</Background>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
