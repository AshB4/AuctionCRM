/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	fetchEquipmentTypes,
	createEquipmentType,
	updateEquipmentType,
	deleteEquipmentType,
} from "../ApiCalls/typesCrud";

function EquipmentTypes() {
	const [equipmentTypes, setEquipmentTypes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newEquipmentTypeData, setNewEquipmentTypeData] = useState({
		type: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchEquipmentTypes();
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
	}, []);

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
			fetchData();
			setNewEquipmentTypeData({
				type: "",
			});
		} catch (error) {
			console.error("Error creating equipment type:", error);
			setError("An error occurred while creating the equipment type.");
		}
	};

  const handleUpdateEquipmentType = async (typeId) => {
		try {
			await updateEquipmentType(typeId);
			fetchData();
		} catch (error) {
			console.error("Error updating equipment type:", error);
			setError("An error occurred while updating the equipment type.");
		}
	};


  const handleDeleteEquipmentType = async (typeId) => {
		try {     
			await deleteEquipmentType(typeId);
			fetchData();
		} catch (error) {
			console.error("Error deleting equipment type:", error);
			setError("An error occurred while deleting the equipment type.");
		}
	};

	return (
		<div className="container">
			<h2 className="centered">Equipment Types</h2>
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
							name="ID"
							value={newEquipmentTypeData.ID}
							onChange={handleInputChange}
							placeholder="Id number"
						/>
					</div>
					<div className="inputs">
						<input
							type="text"
							name="type"
							value={newEquipmentTypeData.type}
							onChange={handleInputChange}
							placeholder="Type"
						/>
					</div>
					<div className="yellow-button">
						<button className="buttons" onClick={handleAddEquipmentType}>
							ADD
						</button>
					</div>
					<button
						className="buttons"
						onClick={handleDeleteEquipmentType}>
						DELETE
					</button>
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
							<tr key={type.id}>
								{/* Ensure unique key */}
								<td>{type.id}</td>
								<td>{type.type}</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EquipmentTypes;
