import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerOrders() {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/customer-orders/"
        );
        setCustomerOrders(response.data);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
        setError("An error occurred while fetching customer orders.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerOrders();
  }, []);

  return (
    <div className="container">
      <div className="sections">
        <h2 className="centered">Customer Orders</h2>
        {isLoading && <p>Loading Customer Orders...</p>}{" "}
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
              <th>Order ID</th>
              <th>Listing ID</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {customerOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.listing_id}</td>
                <td>{order.customer}</td>
                <td>{order.quantity}</td>
                <td>{order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerOrders;
