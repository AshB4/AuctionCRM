/** @format */

import axios from "axios";

// Enhanced API Base URL with environment variable consideration
const API_BASE_URL =
	process.env.REACT_APP_API_URL || "http://localhost:8000/transactions/";

async function fetchTransactions() {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching transactions:", error);
		throw new Error("An error occurred while fetching transactions.");
	}
}

async function createTransaction(transactionData) {
	try {
		const response = await axios.post(API_BASE_URL, transactionData);
		return response.data;
	} catch (error) {
		console.error("Error creating transaction:", error);
		throw new Error("An error occurred while creating the transaction.");
	}
}

async function updateTransaction(transactionId, newTransactionData) {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/transactions/${transactionId}`,
			newTransactionData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating transaction:", error);
		throw new Error("An error occurred while updating the transaction.");
	}
}

async function deleteTransaction(transactionId,updatedData ) {
	try {
		await axios.delete(`${API_BASE_URL}/${transactionId}/`);
		return true; 
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
