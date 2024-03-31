import axios from "axios";
import { getCookie } from "../Utils/cookie";

const API_BASE_URL = "http://localhost:8000/customer-list/";

async function fetchCustomer() {
  const csrftoken = getCookie("csrftoken");
	const headers = { "X-CSRFToken": csrftoken };
	try {
    console.log("Fetching List of Customers")
		const response = await axios.get(API_BASE_URL, { headers });
    console.log("List of Customer fetched successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching customer list:", error);
		throw new Error("An error occurred while fetching customer list.");
	}
}

async function createCustomer(customerData) {
	try {
    console.log("Creating Customer List:" , customerData)
		const response = await axios.post(API_BASE_URL, customerData);
    console.log("Customer list created successfully", response.data)
		return response.data;
	} catch (error) {
		console.error("Error creating customer:", error);
		throw new Error("An error occurred while creating the customer.");
	}
}

async function updateCustomer(customer_id, updatedData) {
	try {
    console.log("Updating Customer List:", customer_id)
		const response = await axios.put(`${API_BASE_URL}${customer_id}`,updatedData);
    console.log("Customer list updated sucessfully:", response.data)
		return response.data;
	} catch (error) {
		console.error("Error updating customer:", error);
		throw new Error("An error occurred while updating the customer.");
	}
}

async function deleteCustomer(customerId) {
	try {
    console.log("Deleteing Customer from List");
    const response = await axios.delete(`${API_BASE_URL}${customerId}`);
    console.log("Customer list deleted sucessfully:", response.data)
    return response.data;
	} catch (error) {
		console.error("Error deleting customer from list:", error);
		throw new Error("An error occurred while deleting the customer from the list.");
	}
}

export { fetchCustomer, createCustomer, updateCustomer, deleteCustomer };
