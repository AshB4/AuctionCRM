import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/customers";

async function fetchCustomers() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("An error occurred while fetching customers.");
  }
}

async function createCustomer(customerData) {
  try {
    const response = await axios.post(API_BASE_URL, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("An error occurred while creating the customer.");
  }
}

async function updateCustomer(customerId, updatedData) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${customerId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("An error occurred while updating the customer.");
  }
}

async function deleteCustomer(customerId) {
  try {
    await axios.delete(`${API_BASE_URL}/${customerId}`);
    return true; // Or you can return some indication of success
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("An error occurred while deleting the customer.");
  }
}

export { fetchCustomers, createCustomer, updateCustomer, deleteCustomer };
