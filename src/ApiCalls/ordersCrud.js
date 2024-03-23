/** @format */

import axios from "axios";

const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/customer-list/";

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

async function updateCustomerOrder(order_ID, updatedData) {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/${order_ID}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating customer order:", error);
		throw new Error("An error occurred while updating the customer order.");
	}
}

async function deleteCustomerOrder(order_ID) {
	try {
		await axios.delete(`${API_BASE_URL}/${order_ID}`);
		return true;
	} catch (error) {
		console.error("Error deleting customer order:", error);
		throw new Error("An error occurred while deleting the customer order.");
	}
}

export {
	fetchCustomerOrders,
	createCustomerOrder,
	updateCustomerOrder,
	deleteCustomerOrder,
};
