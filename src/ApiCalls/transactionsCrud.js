/** @format */

import axios from "axios";
import { getCookie } from "../Utils/cookie";

const API_BASE_URL = "http://localhost:8000/transactions/";

async function fetchTransactions() {
	const csrftoken = getCookie("csrftoken"); 
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Fetching Transactions...");
		const response = await axios.get(API_BASE_URL , {headers});
		console.log("Transactions fetched successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching transactions:", error);
		throw new Error("An error occurred while fetching transactions.");
	}
}

async function createTransaction(transactionData) {
	const csrftoken = getCookie("csrftoken"); // Get CSRF token
	const headers = {
		"Content-Type": "application/json",
		"X-CSRFToken": csrftoken,
	};

	try {
		console.log("Creating new Transaction", transactionData);
		const response = await axios.post(API_BASE_URL, transactionData, {
			headers,
		});
		console.log("Transaction created successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error creating transaction:", error);
		// Check if error.response is defined
		if (error.response) {
			console.error("Error response data:", error.response.data);
			// Re-throw the error to propagate it further if needed
			throw new Error(
				error.response.data ||
					"An error occurred while creating the transaction."
			);
		} else {
			throw new Error("An error occurred while creating the transaction.");
		}
	}
}

async function updateTransaction(transaction_id, updatedData) {
	try {
		console.log("Updating Transactions:", transaction_id)
		const response = await axios.put(`${API_BASE_URL}/transactions/${transaction_id}`, updatedData);
		console.log("Transaction updated successfully:" ,response.data);
		return response.data;
	} catch (error) {
		console.error("Error updating transaction:", error);
		throw new Error("An error occurred while updating the transaction.");
	}
}

async function deleteTransaction(transactionId ) {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${transactionId}/`);
		return response.data; 
	} catch (error) {
		console.error("Error deleting transaction:", error);
		throw new Error("An error occurred while deleting the transaction.");
	}
}

export {
	fetchTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};
