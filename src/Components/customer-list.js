/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	fetchCustomers,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "../ApiCalls/customerCrud";

function CustomerList() {
	const [customers, setCustomers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newCustomerData, setNewCustomerData] = useState({
		name: "",
		contact: "",
		email: "",
		phone: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchCustomers(); // Call the fetchCustomers function
			setCustomers(data);
		} catch (error) {
			console.error("Error fetching customers:", error);
			setError("An error occurred while fetching customers.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(); // Call the fetchData function when the component mounts
	}, []); // Empty dependency array to run the effect only once

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
			fetch();
			setNewCustomerData({
				// Resets input fields after adding customer
				name: "",
				contact: "",
				email: "",
				phone: "",
			});
		} catch (error) {
			console.error("Error creating customer:", error);
			setError("An error occurred while creating the customer.");
		}
	};

	const handleDeleteCustomer = async (customerId) => {
		try {
			await deleteCustomer(customerId);
			fetchData();
		} catch (error) {
			console.error("Error deleting customer:", error);
			setError("An error occurred while deleting the customer.");
		}
	};

	const handleUpdateCustomer = async (customerId, updatedData) => {
		try {
			await updateCustomer(customerId, updatedData);
			fetchData();
		} catch (error) {
			console.error("Error updating customer:", error);
			setError("An error occurred while updating the customer.");
		}
	};

	return (
    <div className="topDiv">
		<div className="container">
			<div className="titles">
				<h2 className="form-titles">CUSTOMER LIST</h2>
			</div>
			<br />
			<div className="sections">
				<div>
					<br />
					<h3>EDIT INFORMATION:</h3>
					<div className="inputs-form">
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
							<button className="buttons" onClick={handleAddCustomer}>UPDATE</button>
							<button className="buttons" onClick={handleDeleteCustomer}>DELETE</button>
            </div>
					</div>

					{/* {customers.map((customer) => (
						<div key={customer.id}>
							<div className="yellow-button">
								<button
									className="buttons"
									onClick={() => handleUpdateCustomer(customer.id)}>
									Delete
								</button>
							</div>
							<div className="yellow-button">
								<button
									className="buttons"
									onClick={() =>
										handleUpdateCustomer(customer.id, {
											name: newCustomerData.name,
											contact: newCustomerData.contact,
											email: newCustomerData.email,
											phone: newCustomerData.phone,
										})
									}>
									Update
								</button>
							</div>
							<div className="yellow-button">
								<button
									className="buttons"
									onClick={() =>
										handleUpdateCustomer(customer.id, {
											name: newCustomerData.name,
											contact: newCustomerData.contact,
											email: newCustomerData.email,
											phone: newCustomerData.phone,
										})
									}>
									Save
								</button>
							</div>
						</div>
					))} */}
					{isLoading && <p>Loading customers...</p>}
					{error && (
						<div className="error-container">
							<p className="error">{error}</p>
						</div>
					)}
					<br />
					<table>
						<thead>
							<tr>
								<th>Customer ID</th>
								<th>Name</th>
								<th>Contact</th>
								<th>Email</th>
								<th>Phone</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer) => (
								<tr key={customer.id}>
									<td>{customer.id}</td>
									<td>{customer.name}</td>
									<td>{customer.contact}</td>
									<td>{customer.email}</td>
									<td>{customer.phone}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
    </div>
	);
}

export default CustomerList;
//saved to notes for this file an alt version. may be due to they all say customer and not update,del,etc;
