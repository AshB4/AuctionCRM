/** @format */

import React, { useEffect, useState } from "react";

import {
	fetchCustomerOrders,
	createCustomerOrder,
	updateCustomerOrder,
	deleteCustomerOrder,
} from "../ApiCalls/ordersCrud";

function CustomerOrders() {
	const [orders, setOrders] = useState([]);
	const [customerOrders, setCustomerOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newCustomerData, setNewCustomerData] = useState({
		order_ID: "",
		listing_ID: "",
		customer: "",
		quantity: "",
		total_price: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCustomerData({
			...newCustomerData,
			[name]: value,
		});
	};

	 useEffect(() => {
			const fetchOrders = async () => {
				try {
					const response = await fetch(
						"http://127.0.0.1:8000/customer/orders/",
						{
							method: "GET",
							headers: {
								Origin: "http://localhost:3000",
								// Add other headers as needed
							},
						}
					);
					const data = await response.json();
					setOrders(data);
				} catch (error) {
					console.error("Error fetching orders:", error);
				}
			};

			fetchOrders();
		}, []); 

	async function fetchData() {
		try {
			setIsLoading(true);
			const data = await fetchCustomerOrders();
			setCustomerOrders(data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching customer orders:", error);
			setError("An error occurred while fetching customer orders.");
			setIsLoading(false);
		}
	}

	async function createCustomer() {
		try {
			await createCustomerOrder(newCustomerData);
			fetchData();
			setNewCustomerData({
				order_ID: "",
				listing_ID: "",
				customer: "",
				quantity: "",
				total_price: "",
			});
		} catch (error) {
			console.error("Error creating customer:", error);
			setError("An error occurred while creating the customer.");
		}
	}

	async function updateCustomer(order_ID) {
		try {
			await updateCustomerOrder(order_ID, newCustomerData);
			fetchData();
			setNewCustomerData({
				order_ID: "",
				listing_ID: "",
				customer: "",
				quantity: "",
				total_price: "",
			});
		} catch (error) {
			console.error("Error updating customer:", error);
			setError("An error occurred while updating the customer.");
		}
	}

	async function deleteCustomer(order_ID) {
		try {
			await deleteCustomerOrder(order_ID);
			fetchData();
		} catch (error) {
			console.error("Error deleting customer:", error);
			setError("An error occurred while deleting the customer.");
		}
	}

	return (
		<div className="container">
			<div className="sections">
				<h2 className="centered">Customer Orders</h2>
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
									type="number"
									name="order_ID"
									value={newCustomerData.order_ID}
									onChange={handleInputChange}
									placeholder="Order ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="listing_ID"
									value={newCustomerData.listing_ID}
									onChange={handleInputChange}
									placeholder="Listing ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="text"
									name="customer"
									value={newCustomerData.customer}
									onChange={handleInputChange}
									placeholder="Customer"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="quantity"
									value={newCustomerData.quantity}
									onChange={handleInputChange}
									placeholder="Quantity"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="total_price"
									value={newCustomerData.total_price}
									onChange={handleInputChange}
									placeholder="Total Price"
								/>
							</div>
							<div className="yellow-button">
								<button
									className="buttons"
									onClick={() => updateCustomer(newCustomerData.order_ID)}>
									UPDATE
								</button>
								<button
									className="buttons"
									onClick={() => deleteCustomer(newCustomerData.order_ID)}>
									DELETE
								</button>
							</div>
						</div>
						<table>
							<thead>
								<tr>
									<th>Order ID</th>
									<th>Listing ID</th>
									<th>Customer</th>
									<th>Quantity</th>
									<th>Total Price</th>
								</tr>
							</thead>
							<tbody>
								{customerOrders.map((order) => (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.listing_ID}</td>
										<td>{order.customer}</td>
										<td>{order.quantity}</td>
										<td>{order.total_price}</td>
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

export default CustomerOrders;
