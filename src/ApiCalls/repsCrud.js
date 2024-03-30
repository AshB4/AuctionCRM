/** @format */

import axios from "axios";
import { getCookie } from "../Utils/cookie";

const API_BASE_URL = "http://localhost:8000/sales-representatives/";

async function fetchSalesReps() {
	const csrftoken = getCookie("csrftoken"); // Use the getCookie function to retrieve the CSRF token
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Fetching Sales Rep List...");
		const response = await axios.get(API_BASE_URL, { headers });
		console.log("Sales Rep List fetched successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching sales rep list:", error);
		throw new Error("An error occurred while fetching sales rep list.");
	}
}

async function createSalesRep(repData) {
	try {
		console.log("Creating sales representative:", repData);
		const response = await axios.post(API_BASE_URL, repData);
		console.log("Sales representative created successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error creating sales representative:", error);
		throw new Error(
			"An error occurred while creating the sales representative."
		);
	}
}

async function updateSalesRep(rep_id, updatedData) {
	try {
		console.log("Updating sales representative with ID:", rep_id);
		const response = await axios.put(`${API_BASE_URL}${rep_id}`, updatedData);
		console.log("Sales representative updated successfully:", response.data);
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
		const response = await axios.delete(`${API_BASE_URL}${repId}`);
		console.log("Sales representative deleted successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error deleting sales representative:", error);
		throw new Error(
			"An error occurred while deleting the sales representative."
		);
	}
}

export { fetchSalesReps, createSalesRep, updateSalesRep, deleteSalesRep };
