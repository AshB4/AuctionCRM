import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import EquipmentTypes from "./Components/equipment-types";
import EquipmentListings from "./Components/equipment-listings";
import CustomerOrders from "./Components/customer-orders";
import CustomerList from "./Components/customer-list";
import SalesReps from "./Components/sales-reps";
import Transactions from "./Components/transaction";
import DrawerMenu from "./Components/side-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import "./index.css";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
		<Router>
			<div className="headers">
				<div className="square"> </div>
				<h1>ASH'S AUCTION'S C.R.M.</h1>
				<h3>Building dreams,<p> one bid at a time.</p></h3>
			</div>

			<DrawerMenu />

			<div className="content">
				<Routes>
					<Route path="/equipment-types" element={<EquipmentTypes />} />
					<Route path="/equipment-listings" element={<EquipmentListings />} />
					<Route path="/customer-orders" element={<CustomerOrders />} />
					<Route path="/customer-list" element={<CustomerList />} />
					<Route path="/sales-reps" element={<SalesReps />} />
					<Route path="/transactions" element={<Transactions />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
