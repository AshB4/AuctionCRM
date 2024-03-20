/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/equipment-listings";

async function fetchEquipmentListings() {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment listings:", error);
		throw new Error("An error occurred while fetching equipment listings.");
	}
}

async function createEquipmentListing(listingData) {
	try {
		const response = await axios.post(API_BASE_URL, listingData);
		return response.data;
	} catch (error) {
		console.error("Error creating equipment listing:", error);
		throw new Error("An error occurred while creating the equipment listing.");
	}
}

async function updateEquipmentListing(listingId, updatedData) {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/${listingId}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating equipment listing:", error);
		throw new Error("An error occurred while updating the equipment listing.");
	}
}

async function deleteEquipmentListing(listingId) {
	try {
		await axios.delete(`${API_BASE_URL}/${listingId}`);
		return true; // Or you can return some indication of success
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
