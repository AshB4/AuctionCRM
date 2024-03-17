import React, { useEffect, useState } from "react";
import axios from "axios";

function EquipmentListings() {
  const [equipmentListings, setEquipmentListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/equipment-listings/"
        );
        setEquipmentListings(response.data);
      } catch (error) {
        console.error("Error fetching equipment listings:", error);
        setError("An error occurred while fetching equipment listings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipmentListings();
  }, []);

  return (
    <div className="container">
      <div className="sections">
        <h2 className="centered">Equipment Listings</h2>
        {isLoading && <p>Loading Equipment Listings...</p>}{" "}
        {/* Display messages */}
        {error && (
          <div className="error-container">
            <p className="error">{error}</p>
          </div>
        )}
        <br></br>
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
              <tr key={listing.id}>
                {" "}
                {/* Ensure unique key */}
                <td>{listing.id}</td>
                <td>{listing.type_id}</td>
                <td>{listing.make}</td>
                <td>{listing.model}</td>
                <td>{listing.year}</td>
                <td>{listing.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentListings;
