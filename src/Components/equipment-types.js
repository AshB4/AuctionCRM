/** @format */

import React, { useEffect, useState,  } from "react";
import axios from 'axios';
import {getCookie} from "../Utils.js/cookie";
import {
	fetchEquipmentTypes,
	createEquipmentType,
	updateEquipmentType,
	deleteEquipmentType,
} from "../ApiCalls/typesCrud";
import { Link, useParams} from "react-router-dom";


function EquipmentTypes() {
	const { id } = useParams();
	const [equipmentTypes, setEquipmentTypes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newEquipmentTypeData, setNewEquipmentTypeData] = useState({
		type_id: "",
    type_name: "",
	});
	const [deleteEquipmentTypeData, setDeleteEquipmentTypeData] = useState({
		type_id: "",
		type_name: "",
	});


	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchEquipmentTypes(id);
			setEquipmentTypes(data);
		} catch (error) {
			console.error("Error fetching equipment types:", error);
			setError("An error occurred while fetching equipment types.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewEquipmentTypeData({
			...newEquipmentTypeData,
			[name]: value,
		});
	};

	const handleAddEquipmentType = async () => {
		try {
			await createEquipmentType(newEquipmentTypeData);
			setNewEquipmentTypeData({
				type_id: "",
        type_name: "",
			});
			fetchData();
		} catch (error) {
			console.error("Error creating equipment type:", error);
			setError("An error occurred while creating the equipment type.");
		}
	};

	const handleUpdateEquipmentType = async (typeId, updatedData) => {
		try {
			await updateEquipmentType(typeId, updatedData);
			fetchData();
		} catch (error) {
			console.error("Error updating sales representative:", error);
			setError("An error occurred while updating the sales representative.");
		}
		console.log(typeId);
		console.log(updatedData);
	};

	// const handleDeleteChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setDeleteEquipmentTypeData({
	// 		...deleteEquipmentTypeData,
	// 		[name]: value,
	// 	});
	// };

	// const handleDeleteEquipmentType = async () => {
	// 	try {
	// 		await deleteEquipmentType(deleteEquipmentTypeData.type_id);
	// 		console.log("Equipment type deleted successfully");
	// 		fetchData(); // Fetch data again after deletion
	// 	} catch (error) {
	// 		console.error("Error deleting equipment type:", error);
	// 		setError("An error occurred while deleting the equipment type.");
	// 	}
	// };

	//  const handleDeleteEquipmentType = async (typeId) => {
	// 		try {
	// 			await deleteEquipmentType(typeId);
	// 			console.log("Equipment type deleted successfully");
	// 			fetchData(); // Fetch data again after deletion
	// 		} catch (error) {
	// 			console.error("Error deleting equipment type:", error);
	// 			setError("An error occurred while deleting the equipment type.");
	// 		}
	// 	};

	const handleDeleteEquipmentType = async (typeId) => {
		try {
			const csrftoken = getCookie("csrftoken");
			const headers = { "X-CSRFToken": csrftoken };
			    await axios.delete(
						`http://localhost:8000/equipment/types/${typeId}/`,
						{ headers }
					);
			console.log("Equipment type deleted successfully");
			fetchData(); // Fetch data again after deletion
		} catch (error) {
			console.error("Error deleting equipment type:", error);
			setError("An error occurred while deleting the equipment type.");
		}
	};

	return (
		<div className="container">
			<h2 className="centered">Equipment Types</h2>
			<ul style={{ display: "none" }}>
				{equipmentTypes.map((type) => (
					<li key={type.type_id}>
						<Link
							to={`http://localhost:8000/equipment/types/${type.type_id}`}></Link>
					</li>
				))}
			</ul>
			<div className="sections">
				<br />
				<h3>EDIT LISTING:</h3>
				{isLoading && <p>Loading Equipment Types...</p>}
				{/* Display messages */}
				{error && (
					<div className="error-container">
						<p className="error">{error}</p>
					</div>
				)}
				<br />
				<div className="inputs-form">
					<div className="inputs">
						<input
							type="number"
							name="type_id"
							value={newEquipmentTypeData.type_id}
							onChange={handleInputChange}
							placeholder="ID"
						/>
					</div>
					<div className="inputs">
						<input
							type="text"
							name="type_name"
							value={newEquipmentTypeData.type_name}
							onChange={handleInputChange}
							placeholder="Type"
						/>
					</div>
					<div className="yellow-button">
						<button className="buttons" onClick={handleAddEquipmentType}>
							ADD
						</button>
					</div>
				</div>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{equipmentTypes.map((type) => (
							<tr key={type.type_id}>
								<td>{type.type_id}</td>
								<td>{type.type_name}</td>
								<td>
									<button
										className="buttons"
										onClick={() => handleDeleteEquipmentType(type.type_id)}>
										DELETE
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EquipmentTypes;
