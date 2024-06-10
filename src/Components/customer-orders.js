/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Utils/cookie";
import {
	fetchCustomerOrders,
	createCustomerOrder,
	updateCustomerOrder,
	deleteCustomerOrder,
} from "../ApiCalls/ordersCrud";

function CustomerOrders() {
	const { id } = useParams();
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

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchCustomerOrders(id);
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
	}, [id]);


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCustomerData({
			...newCustomerData,
			[name]: value,
		});
	};

	async function handleAddCustomerOrder() {
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
			fetchData();
		} catch (error) {
			console.error("Error creating customer:", error);
			setError("An error occurred while creating the customer.");
		}
	}

	async function handleUpdateCustomer(orderId) {
		try {
			await updateCustomerOrder(orderId, newCustomerData);
			fetchData();
		} catch (error) {
			console.error("Error updating customer:", error);
			setError("An error occurred while updating the customer.");
		}
	}

	async function handleDeleteCustomerOrder(orderId) {
		try {
			const csrftoken = getCookie("csrftoken");
			const headers = { "X-CSRFToken": csrftoken };
			await axios.delete(`http://localhost:8000/customer/orders/${orderId}/`, {headers,});
			console.log("Customer order deleted successfully");
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
				<ul style={{ display: "none" }}>
					{customerOrders.map((order) => (
						<li key={order.order_id}>
							<Link
								to={`http://localhost:8000/customer/orders/${order.order_id}`}></Link>
						</li>
					))}
				</ul>
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
								<button className="buttons" onClick={handleAddCustomerOrder}>
									ADD
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
										<td>
										<button
											className="buttons"
											onClick={() => handleDeleteCustomerOrder(order.order_id)}>
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
		</div>
	);
}

export default CustomerOrders;
