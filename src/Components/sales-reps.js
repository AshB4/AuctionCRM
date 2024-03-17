import React, { useEffect, useState } from "react";
import axios from "axios";

function SalesReps() {
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReps = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/sales-reps/"
        );
        setSalesReps(response.data);
      } catch (error) {
        console.error("Error fetching sales reps:", error);
        setError("An error occurred while fetching sales representatives.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesReps();
  }, []);

  return (
    <div className="container">
      <div className="sections">
        <h2 className="centered">Sales Representatives</h2>
        {isLoading && <p>Loading sales representatives...</p>}{" "}
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
              <th>Rep ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {salesReps.map((rep) => (
              <tr key={rep.id}>
                {" "}
                {/* Ensure unique key */}
                <td>{rep.id}</td>
                <td>{rep.name}</td>
                <td>{rep.email}</td>
                <td>{rep.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesReps;
