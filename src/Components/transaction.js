/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Utils/cookie";
import {
	fetchTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
} from "../ApiCalls/transactionsCrud";

function Transactions() {
	const { id } = useParams();
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newTransactionData, setNewTransactionData] = useState({
		transaction_id: "",
		order_id: "",
		payment_method: "",
		amount: "",
		status: "",
	});

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await fetchTransactions();
			setTransactions(data);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			setError("An error occurred while fetching transactions.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTransactionData({
			...newTransactionData,
			[name]: value,
		});
	};

	const handleAddTransaction = async () => {
		try {
			await createTransaction(newTransactionData);
			fetchData();
			setNewTransactionData({
				transaction_id: "",
				order_id: "",
				payment_method: "",
				amount: "",
				status: "",
			});
		} catch (error) {
			console.error("Error creating transaction:", error);
			if (error.response) {
				// If error.response is defined, log error.response.data
				console.log("Error response data:", error.response.data);
			} else {
				console.log("Error response is not defined");
			}
			setError("An error occurred while creating the transaction.");
		}
	};

	const handleUpdateTransaction = async (transactionId, updatedData) => {
		try {
			await updateTransaction(transactionId, updatedData);
			fetchData();
		} catch (error) {
			console.error("Error updating transactions", error);
			setError("An error occurred while updating Transactions");
		}
	};

	const handleDeleteTransaction = async (transactionId) => {
		try {
			const csrftoken = getCookie("csrftoken");
			const headers = { "X-CSRFToken": csrftoken };
			await axios.delete(
				`http://localhost:8000/transactions/${transactionId}/`,
				{ headers }
			);
			fetchData();
		} catch (error) {
			console.error("Error deleting transaction:", error);
			setError("An error occurred while deleting the transaction.");
		}
	};

	return (
		<div className="container">
			<h2 className="centered">Transactions</h2>
			<ul style={{ display: "none" }}>
				{transactions.map((transaction) => (
					<li key={transaction.transaction_id}>
						<Link
							to={`http://localhost:8000/transactions/${transaction.transaction_id}`}></Link>
					</li>
				))}
			</ul>
			<div className="sections">
				<br />
				<h3>EDIT TRANSACTIONS : </h3>
				{isLoading && <p>Loading transactions...</p>}
				{/* Display messages */}
				{error && <p>Error: {error}</p>}
				<br />
				<div className="inputs-form">
					<div className="inputs">
						<input
							type="number"
							name="transaction_id"	
							value={newTransactionData.transaction_id}
							onChange={handleInputChange}
							placeholder="Transaction ID"
						/>
					</div>
					<div className="inputs">
						<input
							type="number"
							name="order_id"
							value={newTransactionData.order_id}
							onChange={handleInputChange}
							placeholder="Order ID"
						/>
					</div>
					<div className="inputs">
						<input
							type="text"
							name="payment_method"
							value={newTransactionData.payment_method}
							onChange={handleInputChange}
							placeholder="Payment Method"
						/>
					</div>
					<div className="inputs">
						<input
							type="number"
							name="amount"
							value={newTransactionData.amount}
							onChange={handleInputChange}
							placeholder="Amount"
						/>
					</div>
					<div className="inputs">
						<input
							type="text"
							name="status"
							value={newTransactionData.status}
							onChange={handleInputChange}
							placeholder="Status"
						/>
					</div>

					<div className="yellow-button">
						<button className="buttons" onClick={handleAddTransaction}>
							ADD
						</button>
					</div>
				</div>
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
							<tr key={transaction.transaction_id}>
								<td>{transaction.transaction_id}</td>
								<td>{transaction.order_id}</td>
								<td>{transaction.payment_method}</td>
								<td>{transaction.amount}</td>
								<td>{transaction.status}</td>
								<td>
									<button
										className="buttons"
										onClick={() =>
											handleDeleteTransaction(transaction.transaction_id)
										}>
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

export default Transactions;
