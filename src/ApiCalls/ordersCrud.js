/** @format */

import axios from "axios";
import { getCookie } from "../Utils/cookie";

const API_BASE_URL = "http://localhost:8000/customer/orders/";

async function fetchCustomerOrders() {
	const csrftoken = getCookie("csrftoken"); 
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Fetching Customer Orders...")
		const response = await axios.get(API_BASE_URL, { headers });
		console.log("Customer Orders fetched successfilly:", response.data)
		return response.data;
	} catch (error) {
		console.error("Error fetching customer orders:", error);
		throw new Error("An error occurred while fetching customer orders.");
	}
}

async function createCustomerOrder(orderData) {
	try {
		console.log("Creating Customer Order:", orderData)
		const response = await axios.post(API_BASE_URL, orderData);
		console.log("Customer order created successfully", response.data);
		return response.data;
	} catch (error) {
		console.error("Error creating customer order:", error);
		throw new Error("An error occurred while creating the customer order.");
	}
}

async function updateCustomerOrder(order_id, updatedData) {
	try {
		console.log("Updateing customer order:", order_id);
		const response = await axios.put(`${API_BASE_URL}${order_id}`, updatedData);
		console.log("Custome order updated successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error updating customer order:", error);
		throw new Error("An error occurred while updating the customer order.");
	}
}

async function deleteCustomerOrder(orderId) {
	try {
		console.log("Deleting Customer Order")
		const response = await axios.delete(`${API_BASE_URL}${orderId}`);
		console.log("Customer order deleted successfully:", response.data);
		return response.data;
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
