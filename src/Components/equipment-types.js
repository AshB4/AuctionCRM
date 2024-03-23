/** @format */

import React, { useEffect, useState } from "react";
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
		type_id: "",
    type_name: "",
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
				
					<button
						className="buttons"
						onClick={() => handleDeleteEquipmentType(equipmentTypes[0]?.id)}>
						DELETE
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
							<tr key={type.id}>
								{/* Ensure unique key */}
								<td>{type.type_id}</td>
								<td>{type.type_name}</td>
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
