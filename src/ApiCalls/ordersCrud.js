
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/customer-orders";

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
		const response = await axios.put(`${API_BASE_URL}/${orderId}`, updatedData);
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

export default {
	fetchCustomerOrders, createCustomerOrder, updateCustomerOrder,deleteCustomerOrder};
