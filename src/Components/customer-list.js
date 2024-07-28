/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Utils/cookie";
import {
	fetchCustomer,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "../ApiCalls/customerCrud";

function CustomerList() {
	const { id } = useParams();
	const [customers, setCustomers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newCustomerData, setNewCustomerData] = useState({
		customer_id: "",
		name: "",
		contact: "",
		email: "",
		phone: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchCustomer(id);
			setCustomers(data);
		} catch (error) {
			console.error("Error fetching list of customers:", error);
			setError("An error occurred while fetching list of customers.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCustomerData({
			...newCustomerData,
			[name]: value,
		});
	};

	const handleAddCustomer = async () => {
		try {
			await createCustomer(newCustomerData);
			setNewCustomerData({
				customer_id: "",
				name: "",
				contact: "",
				email: "",
				phone: "",
			});
			fetchData();
		} catch (error) {
			console.error("Error creating customer information:", error);
			setError("An error occurred while creating customer information.");
		}
	};

const handleUpdateCustomer = async (customerId , updatedData) => {
		try{
					await updateCustomer(customerId, updatedData);
					fetchData();
		} catch (error){
			console.error("Error updating list of customers")
			setError("An error occurred while updating the list of customers.");
		}
};	

	const handleDeleteCustomer = async (customerId) => {
		try {
			const csrftoken = getCookie("csrftoken");
			const headers = { "X-CSRFToken": csrftoken };
			await axios.delete(`http://localhost:8000/customer-list/${customerId}/`, {
				headers,
			});
			console.log("Customer deleted successfully");
			fetchData();
		} catch (error) {
			console.error("Error deleting the customer list :", error);
			setError("An error occurred while deleting the customerlist .");
		}
	};

return (
		<div className="container">
			<h2 className="form-titles">LIST OF CUSTOMERS</h2>
			<ul style={{ display: "none" }}>
				{customers.map((customer) => (
					<li key={customer.customer_id}>
						<Link to={`http://localhost:8000/customer-list/${customer.customer_id}`} />
					</li>
				))}
			</ul>
			<div className="sections">
				<br />
				<div>
					<br />
					<h3>EDIT CUSTOMER INFORMATION:</h3>
					{isLoading && <p>Loading customers...</p>}
					{error && <p>Error: {error}</p>}
					<br />
					<div className="inputs-form">
						<div className="inputs">
							<input
								type="number"
								name="customer_id"
								value={newCustomerData.customer_id}
								onChange={handleInputChange}
								placeholder="Customer ID"
							/>
						</div>
						<div className="inputs">
							<input
								type="text"
								name="name"
								value={newCustomerData.name}
								onChange={handleInputChange}
								placeholder="Name"
							/>
						</div>
						<div className="inputs">
							<input
								type="text"
								name="contact"
								value={newCustomerData.contact}
								onChange={handleInputChange}
								placeholder="Contact"
							/>
						</div>
						<div className="inputs">
							<input
								type="email"
								name="email"
								value={newCustomerData.email}
								onChange={handleInputChange}
								placeholder="Email"
							/>
						</div>
						<div className="inputs">
							<input
								type="tel"
								name="phone"
								value={newCustomerData.phone}
								onChange={handleInputChange}
								placeholder="Phone"
							/>
						</div>
						<div className="yellow-button">
							<button className="buttons" onClick={handleAddCustomer}>
								ADD
							</button>
						</div>
					</div>
					<br />
					<table>
						<thead>
							<tr>
								<th>Customer ID</th>
								<th>Name</th>
								<th>Contact</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer) => (
								<tr key={customer.customer_id}>
									<td>{customer.customer_id}</td>
									<td>{customer.name}</td>
									<td>{customer.contact}</td>
									<td>{customer.email}</td>
									<td>{customer.phone}</td>
									<td>
										<button
											className="buttons"
											onClick={() => handleDeleteCustomer(customer.customer_id)}
										>
											DELETE
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CustomerList;
