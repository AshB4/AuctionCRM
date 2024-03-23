/** @format */

import React, { useEffect, useState } from "react";
import {
	fetchSalesReps,
	createSalesRep,
	updateSalesRep,
	deleteSalesRep,
} from "../ApiCalls/repsCrud";

function SalesReps() {
	const [salesReps, setSalesReps] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newSalesRepData, setNewSalesRepData] = useState({
    rep_id:"",
		name: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchSalesReps();
			setSalesReps(data);
		} catch (error) {
			console.error("Error fetching sales reps:", error);
			setError("An error occurred while fetching sales representatives.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewSalesRepData({
			...newSalesRepData,
			[name]: value,
		});
	};

	const handleAddSalesRep = async () => {
		try {
			await createSalesRep(newSalesRepData);
			fetchData();
			setNewSalesRepData({
				rep_id: "",
				name: "",
				email: "",
				phone: "",
			});
		} catch (error) {
			console.error("Error creating sales representative:", error);
			setError("An error occurred while creating the sales representative.");
		}
	};

	const handleDeleteSalesRep = async (repId) => {
		try {
			await deleteSalesRep(repId);
			fetchData();
		} catch (error) {
			console.error("Error deleting sales representative:", error);
			setError("An error occurred while deleting the sales representative.");
		}
	};

	const handleUpdateSalesRep = async (repId) => {
		try {
			await updateSalesRep(repId);
			fetchData();
		} catch (error) {
			console.error("Error updating sales representative:", error);
			setError("An error occurred while updating the sales representative.");
		}
	};

	return (
		<div className="container">
			<h2 className="centered">Sales Representatives</h2>
			<div className="sections">
				<div>
					<br />
					<h3>EDIT REPRESENTATIVES:</h3>
				</div>
				{isLoading && <p>Loading sales representatives...</p>}
				{/* Display messages */}
				{error && (
					<div className="error-container">
						<p className="error">{error}</p>
					</div>
				)}
				<br />
				<div className="inputs-form">
					<div className="inputs">
						<input
							type="text"
							name="rep_id"
							value={newSalesRepData.rep_id}
							onChange={handleInputChange}
							placeholder="Rep ID"
						/>
					</div>
					<div className="inputs">
						<input
							type="text"
							name="name"
							value={newSalesRepData.name}
							onChange={handleInputChange}
							placeholder="Name"
						/>
					</div>
					<div className="inputs">
						<input
							type="email"
							name="email"
							value={newSalesRepData.email}
							onChange={handleInputChange}
							placeholder="Email"
						/>
					</div>
					<div className="inputs">
						<input
							type="tel"
							name="phone"
							value={newSalesRepData.phone}
							onChange={handleInputChange}
							placeholder="Phone"
						/>
					</div>
					<div className="yellow-button">
						<button className="buttons" onClick={handleAddSalesRep}>
							UPDATE
						</button>
					<button className="buttons" onClick={handleDeleteSalesRep}>
						DELETE
					</button>
          </div>
				</div>
				<table>
					<thead>
						<tr>
							<th>Rep ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
					</thead>
					<tbody>
						{salesReps.map((rep) => (
							<tr key={rep.id}>
								<td>{rep.rep_id}</td>
								<td>{rep.name}</td>
								<td>{rep.email}</td>
								<td>{rep.phone}</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SalesReps;
