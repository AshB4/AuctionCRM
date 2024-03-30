/** @format */

import React, { useEffect, useState } from "react";
import {
	fetchCustomerOrders,
	createCustomerOrder,
	updateCustomerOrder,
	deleteCustomerOrder,
} from "../ApiCalls/ordersCrud";

function CustomerOrders() {
	const [customerOrders, setCustomerOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newCustomerData, setNewCustomerData] = useState({
		order_id: "",
		listing_id: "",
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

  const fetchData = async () => {
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
	};

	useEffect(() => {
		fetchData();
	}, []);

	async function createCustomerOrder() {
		try {
			await createCustomerOrder(newCustomerData);
			fetchData();
			setNewCustomerData({
				order_id: "",
				listing_id: "",
				customer: "",
				quantity: "",
				total_price: "",
			});
		} catch (error) {
			console.error("Error creating customer:", error);
			setError("An error occurred while creating the customer.");
		}
	}

	async function updateCustomer(orderId) {
		try {
			await updateCustomerOrder(orderId, newCustomerData);
			fetchData();
			setNewCustomerData({
				order_id: "",
				listing_id: "",
				customer: "",
				quantity: "",
				total_price: "",
			});
		} catch (error) {
			console.error("Error updating customer:", error);
			setError("An error occurred while updating the customer.");
		}
	}

	async function deleteCustomer(orderId) {
		try {
			await deleteCustomerOrder(orderId);
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
									name="order_id"
									value={newCustomerData.order_id}
									onChange={handleInputChange}
									placeholder="Order ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="listing_id"
									value={newCustomerData.listing_id}
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
									onClick={() => updateCustomer(newCustomerData.order_id)}>
									UPDATE
								</button>
								<button
									className="buttons"
									onClick={() => deleteCustomer(newCustomerData.order_id)}>
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
										<td>{order.order_id}</td>
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
