import React, { useState } from "react";
import {
	BrowserRouter as Router,
  Routes,
  Route,
Navigate,
} from "react-router-dom";
import Home from "./Pages/home";
// import Login from "./Pages/login";
import EquipmentTypes from "./Components/equipment-types";
import EquipmentListings from "./Components/equipment-listings";
import CustomerOrders from "./Components/customer-orders";
import CustomerList from "./Components/customer-list";
import SalesReps from "./Components/sales-reps";
import Transactions from "./Components/transaction";
import DrawerMenu from "./Components/side-menu";
import "./App.css";
import "./index.css";

function App() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	// const handleLogin = () => {
	// 	setIsAuthenticated(true);
	// };

	return (
		<Router>
			<div className="headers">
				<div className="square"> </div>
				<h1>ASH'S AUCTION'S C.R.M.</h1>
				<h3>
					Building dreams,<p> one bid at a time.</p>
				</h3>
			</div>

			<DrawerMenu />

			<div className="content">
				<Routes>
					{/* <Route path="/login" element={<Login onLogin={handleLogin} />} />
					{isAuthenticated ? (
						<> */}
							<Route path="/" element={<Home />} /> {/* Add Home route */}
							<Route path="/equipment-types/" element={<EquipmentTypes />} />
							<Route
								path="/equipment/listings"
								element={<EquipmentListings />}
							/>
							<Route path="/customers" element={<CustomerOrders />} />
							<Route path="/customer-list" element={<CustomerList />} />
							<Route path="/sales-representatives" element={<SalesReps />} />
							<Route path="/transactions" element={<Transactions />} />
						{/* </> */}
					 {/* ) : (
						<Route path="*" element={<Navigate to="/login" />} />
					)} */}
				</Routes>
			</div> 
		</Router>
	);
}

export default App;
