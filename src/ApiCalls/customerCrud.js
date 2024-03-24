import axios from "axios";

const API_BASE_URL =
	process.env.REACT_APP_API_URL ||
	"http://127.0.0.1/customer-list/"; 

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

async function updateCustomer(customers, updatedData) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${customers}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("An error occurred while updating the customer.");
  }
}

async function deleteCustomer(customers) {
  try {
    await axios.delete(`${API_BASE_URL}/${customers}`);
    return true; // Or you can return some indication of success
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("An error occurred while deleting the customer.");
  }
}

export { fetchCustomers, createCustomer, updateCustomer, deleteCustomer };
