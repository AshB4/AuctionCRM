
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Utils/cookie";
import {
	fetchEquipmentListings,
	createEquipmentListing,
	updateEquipmentListing,
	deleteEquipmentListing,
} from "../ApiCalls/equipmentCrud";

function EquipmentListings() {
	const [equipmentListings, setEquipmentListings] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newListingData, setNewListingData] = useState({
		listing_id: "",
		type_id: "",
		make: "",
		model: "",
		year: "",
		price: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchEquipmentListings();
			setEquipmentListings(data);
		} catch (error) {
			console.error("Error fetching equipment listings:", error);
			setError("An error occurred while fetching equipment listings.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewListingData({
			...newListingData,
			[name]: value,
		});
	};

	const handleAddListing = async () => {
		try {
			await createEquipmentListing(newListingData);
			setNewListingData({
				listing_id: "",
				type_id: "",
				make: "",
				model: "",
				year: "",
				price: "",
			});
			fetchData();
		} catch (error) {
			console.error("Error creating equipment listing:", error);
			setError("An error occurred while creating the equipment listing.");
		}
	};

	const handleUpdateListing = async (id, updatedData) => {
		try {
			await updateEquipmentListing(id, updatedData);
			fetchData();
		} catch (error) {
			console.error("Error updating equipment listing:", error);
			setError("An error occurred while updating the equipment listing.");
		}
	};

	const handleDeleteListing = async (id) => {
		try {
			await deleteEquipmentListing(id);
			fetchData();
		} catch (error) {
			console.error("Error deleting equipment listing:", error);
			setError("An error occurred while deleting the equipment listing.");
		}
	};

	return (
		<div className="container">
			<div className="sections">
				<h2 className="centered">Equipment Listings</h2>
				<br />
				<ul style={{ display: "none" }}>
					{equipmentListings.map((listing) => (
						<li key={listing.listing_id}>
							<td>{listing.listing_id}</td>
							<td>{listing.type_id}</td>
							<td>{listing.make}</td>
							<td>{listing.model}</td>
							<td>{listing.year}</td>
							<td>{listing.price}</td>

							<Link
								to={`http://localhost:8000/equipment/listings/${listing.listing_id}`}></Link>
						</li>
					))}
				</ul>
				<div className="sections">
					<div>
						<br />
						<h3>EDIT LISTING:</h3>
						{isLoading && <p>Loading equipment listings...</p>}
						{error && (
							<div className="error-container">
								<p className="error">{error}</p>
							</div>
						)}
						<div className="inputs-form">
							<div className="inputs">
								<input
									type="number"
									name="listing_id"
									value={newListingData.listing_id}
									onChange={handleInputChange}
									placeholder="Listing ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="text"
									name="type_id"
									value={newListingData.type_id}
									onChange={handleInputChange}
									placeholder="Type ID"
								/>
							</div>
							<div className="inputs">
								<input
									type="text"
									name="make"
									value={newListingData.make}
									onChange={handleInputChange}
									placeholder="Make"
								/>
							</div>
							<div className="inputs">
								<input
									type="text"
									name="model"
									value={newListingData.model}
									onChange={handleInputChange}
									placeholder="Model"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="year"
									value={newListingData.year}
									onChange={handleInputChange}
									placeholder="Year"
								/>
							</div>
							<div className="inputs">
								<input
									type="number"
									name="price"
									value={newListingData.price}
									onChange={handleInputChange}
									placeholder="Price"
								/>
							</div>
							{/* Include other input fields here */}
							<div className="yellow-button">
								<button className="buttons" onClick={handleAddListing}>
									ADD
								</button>
							</div>
						</div>
						<br />
						<table>
							<thead>
								<tr>
									<th>Listing ID</th>
									<th>Type ID</th>
									<th>Make</th>
									<th>Model</th>
									<th>Year</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{equipmentListings.map((listing) => (
									<tr key={listing.listing_id}>
										<td>{listing.listing_id}</td>
										<td>{listing.type_id}</td>
										<td>{listing.make}</td>
										<td>{listing.model}</td>
										<td>{listing.year}</td>
										<td>{listing.price}</td>
										{/* Render other fields here */}
										{/* <button
											className="buttons"
											onClick={() => handleDeleteListing(listing.listing_id)}>
											DELETE
										</button> */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EquipmentListings;
