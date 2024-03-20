/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/equipment-types";

async function fetchEquipmentTypes() {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment types:", error);
		throw new Error("An error occurred while fetching equipment types.");
	}
}

async function createEquipmentType(typeData) {
	try {
		const response = await axios.post(API_BASE_URL, typeData);
		return response.data;
	} catch (error) {
		console.error("Error creating equipment type:", error);
		throw new Error("An error occurred while creating the equipment type.");
	}
}

async function updateEquipmentType(typeId, updatedData) {
	try {
		const response = await axios.put(`${API_BASE_URL}/${typeId}`, updatedData);
		return response.data;
	} catch (error) {
		console.error("Error updating equipment type:", error);
		throw new Error("An error occurred while updating the equipment type.");
	}
}

async function deleteEquipmentType(typeId) {
	try {
		await axios.delete(`${API_BASE_URL}/${typeId}`);
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
