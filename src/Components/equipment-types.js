import React, { useEffect, useState } from "react";
import axios from "axios";

function EquipmentTypes() {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentTypes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/equipment-types/"
        );
        setEquipmentTypes(response.data);
      } catch (error) {
        console.error("Error fetching equipment types:", error);
        setError("An error occurred while fetching equipment types.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipmentTypes();
  }, []);

  return (
    <div className="container">
      <div className="sections">
        <h2 className="centered">Equipment Types</h2>
        {isLoading && <p>Loading Equipment Types...</p>}{" "}
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
              <th>ID</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {equipmentTypes.map((type) => (
              <tr key={type.id}>
                {" "}
                {/* Ensure unique key */}
                <td>{type.id}</td>
                <td>{type.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentTypes;
