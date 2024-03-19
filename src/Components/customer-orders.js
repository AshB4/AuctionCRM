/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {fetchCustomerOrders,deleteCustomerOrder, createCustomerOrder,updateCustomerOrder} from '../ApiCalls/ordersCrud';

function CustomerOrders() {
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
		fetchData();
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

	async function fetchCustomerOrders() {
		try {
			const response = await axios.get(API_BASE_URL);
			return response.data;
		} catch (error) {
			console.error("Error fetching customer orders:", error);
			throw new Error("An error occurred while fetching customer orders.");
		}
	}

	async function createCustomerOrder(orderData) {
		try {
			const response = await axios.post(API_BASE_URL, orderData);
			return response.data;
		} catch (error) {
			console.error("Error creating customer order:", error);
			throw new Error("An error occurred while creating the customer order.");
		}
	}

	async function updateCustomerOrder(orderId, updatedData) {
		try {
			const response = await axios.put(
				`${API_BASE_URL}/${orderId}`,
				updatedData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating customer order:", error);
			throw new Error("An error occurred while updating the customer order.");
		}
	}

	async function deleteCustomerOrder(orderId) {
		try {
			await axios.delete(`${API_BASE_URL}/${orderId}`);
			return true; 
		} catch (error) {
			console.error("Error deleting customer order:", error);
			throw new Error("An error occurred while deleting the customer order.");
		}
	}

	const handleAddCustomer = async () => {
		try {
			await createCustomerOrder(newCustomerData);
			fetch();
			setNewCustomerData({
				// Resets input fields after adding or subtracting
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
	};

	const handleDeleteCustomer = async (order_ID) => {
		try {
			await deleteCustomerOrder(order_ID);
			fetchData();
		} catch (error) {
			console.error("Error deleting customer:", error);
			setError("An error occurred while deleting the customer.");
		}
	};

	return (
		<div className="container">
			<div className="sections">
				<h2 className="centered">Customer Orders</h2>
				<br />
				<div className="sections">
					<div>
						<br />
						<h3>EDIT INFORMATION:</h3>
						<div className="inputs-form">
							<div className="inputs">
								<input
									type="number"
									order_ID="order ID"
									value={newCustomerData.order_ID}
									onChange={handleInputChange}
									placeholder="Order ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="Listing ID"
									value={newCustomerData.listing_ID}
									onChange={handleInputChange}
									placeholder="Listing ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="Customer"
									name="Customer"
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
									name="Total Price"
									value={newCustomerData.total_price}
									onChange={handleInputChange}
									placeholder="Total Price"
								/>
							</div>
							<div className="yellow-button">
								<button className="buttons" onClick={handleAddCustomer}>
									UPDATE
								</button>
								<button className="buttons" onClick={handleDeleteCustomer}>
									DELETE
								</button>
							</div>
						</div>
						{isLoading && <p>Loading customers...</p>}
						{error && (
							<div className="error-container">
								<p className="error">{error}</p>
							</div>
						)}
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
										<td>{order.listing_id}</td>
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
