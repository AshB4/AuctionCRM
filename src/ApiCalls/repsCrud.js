/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/sales-reps";

async function fetchSalesReps() {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching sales representatives:", error);
		throw new Error("An error occurred while fetching sales representatives.");
	}
}

async function createSalesRep(repData) {
	try {
		const response = await axios.post(API_BASE_URL, repData);
		return response.data;
	} catch (error) {
		console.error("Error creating sales representative:", error);
		throw new Error(
			"An error occurred while creating the sales representative."
		);
	}
}

async function updateSalesRep(repId, updatedData) {
	try {
		const response = await axios.put(`${API_BASE_URL}/${repId}`, updatedData);
		return response.data;
	} catch (error) {
		console.error("Error updating sales representative:", error);
		throw new Error(
			"An error occurred while updating the sales representative."
		);
	}
}

async function deleteSalesRep(repId) {
	try {
		await axios.delete(`${API_BASE_URL}/${repId}`);
		return true;
	} catch (error) {
		console.error("Error deleting sales representative:", error);
		throw new Error(
			"An error occurred while deleting the sales representative."
		);
	}
}

export { fetchSalesReps, createSalesRep, updateSalesRep, deleteSalesRep };
