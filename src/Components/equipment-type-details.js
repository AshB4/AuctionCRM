// /** @format */

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import EquipmentTypes from "./equipment-types";

// function EquipmentTypeDetails() {
// 	const { id } = useParams();

// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	// Function to delete an equipment type
// 	const deleteEquipmentType = async () => {
// 		try {
// 			await axios.delete(`http://127.0.0.1:8000/equipment/types/${id}`);
// 			console.log("Equipment type deleted successfully");
// 		} catch (error) {
// 			console.error("Error deleting equipment type:", error);
// 			setError(error);
// 		}
// 	};

// 	// Function to update an equipment type
// 	const updateEquipmentType = async (updatedData) => {
// 		try {
// 			await axios.put(
// 				`http://127.0.0.1:8000/equipment/types/${id}`,
// 				updatedData
// 			);
// 			console.log("Equipment type updated successfully");
// 		} catch (error) {
// 			console.error("Error updating equipment type:", error);
// 			setError(error);
// 		}
// 	};

//     // const handleDeleteEquipmentType = async (id) => {
// 	// 		console.log("Deleting equipment type with id:", id); // Log the id
// 	// 		try {
// 	// 			await axios.delete(`http://127.0.0.1:8000/equipment/types/${id}`);
// 	// 			setEquipmentTypes(equipmentTypes.filter((type) => type.id !== id));
// 	// 			console.log("Equipment type deleted successfully");
// 	// 		} catch (error) {
// 	// 			console.error("Error deleting equipment type:", error);
// 	// 			setError(error);
// 	// 		}
// 	// 		if (error) {
// 	// 			return <p>Error: {error.message}</p>;
// 	// 		}
// 	// 	};

// 	useEffect(() => {
// 		setLoading(false); // No need to fetch any details, so set loading to false
// 	}, []);

// 	if (loading) {
// 		return <p>Loading...</p>;
// 	}

// 	if (error) {
// 		return <p>Error: {error.message}</p>;
// 	}

// 	// Render buttons for delete and update
// 	return (
// 		<div>
// 			<h2>Equipment Type Details</h2>
// 			<p>ID: {id}</p>

// 			{/* <EquipmentTypes /> */}
// 			<button onClick={deleteEquipmentType}>Delete</button>
// 			<button
// 				onClick={() =>
// 					updateEquipmentType({
// 						/* updated data */
// 					})
// 				}>
// 				Update
// 			</button>
// 		</div>
// 	);
// }

// export default EquipmentTypeDetails;
