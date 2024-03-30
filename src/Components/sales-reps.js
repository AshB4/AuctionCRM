/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Utils/cookie";
import {
	fetchSalesReps,
	createSalesRep,
	updateSalesRep,
	deleteSalesRep,
} from "../ApiCalls/repsCrud";

function SalesReps() {
	const { id } = useParams();
	const [salesReps, setSalesReps] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newSalesRepData, setNewSalesRepData] = useState({
		rep_id: "",
		name: "",
		email: "",
		phone: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchSalesReps(id); // Use appropriate function to fetch sales reps
			setSalesReps(data);
		} catch (error) {
			console.error("Error fetching sales reps:", error);
			setError("An error occurred while fetching sales representatives.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

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
			setNewSalesRepData({
				rep_id: "",
				name: "",
				email: "",
				phone: "",
			});
			fetchData();
		} catch (error) {
			console.error("Error creating sales representative:", error);
			setError("An error occurred while creating the sales representative.");
		}
	};
	
	const handleUpdateSalesRep = async (repId, updatedData) => {
		try {
			await updateSalesRep(repId, updatedData);
			fetchData();
			} catch (error) {
				console.error("Error updating sales representative:", error);
				setError("An error occurred while updating the sales representative.");
			}
		};

	const handleDeleteSalesRep = async (repId) => {
		try {
			const csrftoken = getCookie("csrftoken");
			const headers = { "X-CSRFToken": csrftoken };
			await axios.delete(
				`http://localhost:8000/sales-representatives/${repId}/`,
				{ headers }
			);
			console.log("Sales representative deleted successfully");
			fetchData(); // Fetch data again after deletion
		} catch (error) {
			console.error("Error deleting sales representative:", error);
			setError("An error occurred while deleting the sales representative.");
		}
	};



	return (
		<div className="container">
			<h2 className="centered">Sales Representatives</h2>
			<ul style={{ display: "none" }}>
				{salesReps.map((rep) => (
					<li key={rep.rep_id}>
						<Link
							to={`http://localhost:8000/sales-representatives/${rep.rep_id}`}></Link>
					</li>
				))}
			</ul>
			<div className="sections">
				<br />
				<h3>Edit Sales Representatives:</h3>
				{isLoading && <p>Loading sales representatives...</p>}
				{error && <p>Error: {error}</p>}
				<br />
				<div className="inputs-form">
					<div className="inputs">
						<input
							type="number"
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
							ADD
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
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{salesReps.map((rep) => (
							<tr key={rep.rep_id}>
								<td>{rep.rep_id}</td>
								<td>{rep.name}</td>
								<td>{rep.email}</td>
								<td>{rep.phone}</td>
								<td>
									<button
										className="buttons"
										onClick={() => handleDeleteSalesRep(rep.rep_id)}>
										DELETE
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SalesReps;