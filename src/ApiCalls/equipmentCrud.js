/** @format */

import axios from "axios";
import { getCookie } from "../Utils/cookie";

const API_BASE_URL = "http://localhost:8000/equipment/listings/";

async function fetchEquipmentListings() {
	const csrftoken = getCookie("csrftoken");
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Fetching equipment listings...");
		const response = await axios.get(API_BASE_URL, { headers });
		console.log("Equipment listings fetched successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment listings:", error);
		throw new Error("An error occurred while fetching equipment listings.");
	}
}

async function createEquipmentListing(listingData) {
	const csrftoken = getCookie("csrftoken");
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Creating equipment listing:", listingData);
		const response = await axios.post(API_BASE_URL, listingData, { headers });
		console.log("Equipment listing created successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error creating equipment listing:", error);
		throw new Error("An error occurred while creating the equipment listing.");
	}
}

async function updateEquipmentListing(listing_id, updatedData) {
	const csrftoken = getCookie("csrftoken");
	const headers = { "X-CSRFToken": csrftoken };
	try {
		console.log("Updating equipment listing with ID:", listing_id);
		const response = await axios.put(
			`${API_BASE_URL}${listing_id}`,
			updatedData,
			{ headers }
		);
		console.log("Equipment listing updated successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error updating equipment listing:", error);
		throw new Error("An error occurred while updating the equipment listing.");
	}
}

async function deleteEquipmentListing(listingId) {
	const csrftoken = getCookie("csrftoken");
	const headers = { "X-CSRFToken": csrftoken };
	try {
		await axios.delete(`${API_BASE_URL}${listingId}`, { headers });
		console.log("Equipment listing deleted successfully");
		return true;
	} catch (error) {
		console.error("Error deleting equipment listing:", error);
		throw new Error("An error occurred while deleting the equipment listing.");
	}
}

export {
	fetchEquipmentListings,
	createEquipmentListing,
	updateEquipmentListing,
	deleteEquipmentListing,
};
