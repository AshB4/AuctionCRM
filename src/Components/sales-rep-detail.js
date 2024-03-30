/** @format */

import React from "react";

function SalesRepDetail({ salesRep }) {
	return (
		<div>
			<h2>{salesRep.name}</h2>
			<p>ID: {salesRep.rep_id}</p>
			<p>Email: {salesRep.email}</p>
			<p>Phone: {salesRep.phone}</p>
			{/* Add more details or actions related to the sales rep */}
		</div>
	);
}

export default SalesRepDetail;
