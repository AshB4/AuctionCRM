/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/equipment-types";

async function fetchEquipmentTypes() {
	try {
		console.log("Fetching equipment types...");
		const response = await axios.get(API_BASE_URL);
		console.log("Equipment types fetched successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment types:", error);
		throw new Error("An error occurred while fetching equipment types.");
	}
}

async function createEquipmentType(typeData) {
	try {
		console.log("Creating equipment type:", typeData);
		const response = await axios.post(API_BASE_URL, typeData);
		console.log("Equipment type created successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error creating equipment type:", error);
		throw new Error("An error occurred while creating the equipment type.");
	}
}

async function updateEquipmentType(typeId, updatedData) {
	try {
		console.log("Updating equipment type with ID:", typeId);
		const response = await axios.put(`${API_BASE_URL}/${typeId}`, updatedData);
		console.log("Equipment type updated successfully:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error updating equipment type:", error);
		throw new Error("An error occurred while updating the equipment type.");
	}
}

async function deleteEquipmentType(typeId) {
	try {
		console.log("Deleting equipment type with ID:", typeId);
		await axios.delete(`${API_BASE_URL}/${typeId}`);
		console.log("Equipment type deleted successfully.");
		return true;
	} catch (error) {
		console.error("Error deleting equipment type:", error);
		throw new Error("An error occurred while deleting the equipment type.");
	}
}


export {
	fetchEquipmentTypes,
	createEquipmentType,
	updateEquipmentType,
	deleteEquipmentType,
};
