/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	fetchTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
} from "../ApiCalls/transactionsCrud";

function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newTransactionData, setNewTransactionData] = useState({
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
				order_id: "",
				payment_method: "",
				amount: "",
				status: "",
			});
		} catch (error) {
			console.error("Error creating transaction:", error);
			setError("An error occurred while creating the transaction.");
		}
	};

	const handleDeleteTransaction = async (transactionId) => {
		try {
			await deleteTransaction(transactionId);
			fetchData();
		} catch (error) {
			console.error("Error deleting transaction:", error);
			setError("An error occurred while deleting the transaction.");
		}
	};

  	const handleUpdateTransaction = async (transactionId) => {
			try {
				await updateTransaction(transactionId);
				fetchData();
			} catch (error) {
				console.error("Error updating transaction:", error);
				setError("An error occurred while updating the transaction.");
			}
		};
	return (
		<div className="container">
			<h2 className="centered">Transactions</h2>
			<div className="sections">
				<div>
					<br />
					<h3>EDIT TRANSACTIONS : </h3>
				</div>
				{isLoading && <p>Loading transactions...</p>}
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
							type="text"
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
						<button className="buttons" onClick={handleUpdateTransaction}>
							UPDATE
						</button>
					</div>
					<button
						className="buttons"
						onClick={ handleDeleteTransaction}>
						DELETE
					</button>
				</div>
				<table>
					<thead>
						<tr>
							<th>Transaction ID</th>
							<th>Order ID</th>
							<th>Payment Method</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Action</th>
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
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Transactions;
