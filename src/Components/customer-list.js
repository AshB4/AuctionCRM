/** @format */

import React, { useEffect, useState } from "react";
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
		customer_id: '',
		name: "",
		contact: "",
		email: "",
		phone: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchCustomers();
			setCustomers(data);
			console.log(data)
		} catch (error) {
			console.error("Error fetching customers:", error);
			setError("An error occurred while fetching customers.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCustomerData({
			...newCustomerData,
			[name]: value,
		});
	};

	const handleUpdateCustomer = async () => {
		try {
			await createCustomer(newCustomerData);
			fetchData();
			setNewCustomerData({
				customer_id: "",
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

	const handleDeleteCustomer = async (customer) => {
		try {
			await deleteCustomer(customer);
			fetchData();
		} catch (error) {
			console.error("Error deleting customer:", error);
			setError("An error occurred while deleting the customer.");
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
						{isLoading && <p>Loading customers...</p>}
						{error && (
							<div className="error-container">
								<p className="error">{error}</p>
							</div>
						)}
						<div className="inputs-form">
							<div className="inputs">
								<input
									type="text"
									name="customer_id"
									value={newCustomerData.customer_id}
									onChange={handleInputChange}
									placeholder="Customer ID"
								/>
							</div>
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
								<button className="buttons" onClick={handleUpdateCustomer}>
									ADD CUSTOMER
								</button>

								<button className="buttons" onClick={handleDeleteCustomer}>
									DELETE
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
										<td></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}

export default CustomerList;
