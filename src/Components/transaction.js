import React, { useEffect, useState } from "react";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/transactions/"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("An error occurred while fetching transactions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="sections">
        <h2 className="centered">Transactions</h2>
        {isLoading && <p>Loading transactions...</p>} {/* Display messages */}
        {error && (
          <div className="error-container">
            <p className="error">{error}</p>
          </div>
        )}
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.order_id}</td>
                <td>{transaction.payment_method}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
