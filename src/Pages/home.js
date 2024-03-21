// import React, {useState} from "react";
// import { Link } from "react-router-dom";
// import EquipmentTypes from "../Components/equipment-types";
// import EquipmentListings from "../Components/equipment-listings";
// import CustomerOrders from "../Components/customer-orders";
// import CustomerList from "../Components/customer-list";
// import SalesReps from "../Components/sales-reps";
// import Transactions from "../Components/transaction";
// import "../App.css"

// function Home() {
//   const [itemsPerPage] = useState(5);

//   return (
//     <div>
//       <h2>CRM Dashboard</h2>

//       <div>
//         <Link to="/equipment-types">View All Equipment Types</Link>
//       </div>
//       <div>
//         <Link to="/equipment-listings">View All Equipment Listings</Link>
//       </div>
//       <div>
//         <Link to="/customer-orders">View All Customer Orders</Link>
//       </div>
//       <div>
//         <Link to="/customer-list">View All Customers</Link>
//       </div>
//       <div>
//         <Link to="/sales-reps">View All Sales Representatives</Link>
//       </div>
//       <div>
//         <Link to="/transactions">View All Transactions</Link>
//       </div>

//       {/* Display top 5 items for each section */}
//       <div>
//         <h3>Top 5 Equipment Types</h3>
//         <EquipmentTypes itemsPerPage={itemsPerPage} />
//       </div>
//       <div>
//         <h3>Top 5 Equipment Listings</h3>
//         <EquipmentListings itemsPerPage={itemsPerPage} />
//       </div>
//       <div>
//         <h3>Top 5 Customer Orders</h3>
//         <CustomerOrders itemsPerPage={itemsPerPage} />
//       </div>
//       <div>
//         <h3>Top 5 Customers</h3>
//         <CustomerList itemsPerPage={itemsPerPage} />
//       </div>
//       <div>
//         <h3>Top 5 Sales Representatives</h3>
//         <SalesReps itemsPerPage={itemsPerPage} />
//       </div>
//       <div>
//         <h3>Top 5 Transactions</h3>
//         <Transactions itemsPerPage={itemsPerPage} />
//       </div>
//     </div>
//   );
//   }
  
// export default Home;
