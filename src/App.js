import React, { useState } from "react";
import {
	BrowserRouter as Router,
  Routes,
  Route,
//   Navigate <--for future login/logout and future protected Routes
} from "react-router-dom";
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
					<Route path="/equipment-types/" element={<EquipmentTypes />} />
					<Route path="/equipment/listings" element={<EquipmentListings />} />
					<Route path="/customers" element={<CustomerOrders />} />
					<Route path="/customer-list" element={<CustomerList />} />
					<Route path="/sales-representatives" element={<SalesReps />} />
					<Route path="/transactions" element={<Transactions />} />
					{/* {salesReps.map((rep) => (
						<Route
							key={rep.rep_id}
							path={`/sales-representatives/${rep.rep_id}`}
							element={<SalesRepDetail salesRep={rep} />}
						/>
					))} */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
