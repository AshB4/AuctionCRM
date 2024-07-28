// /** @format */

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";


// function Login({ onLogin }) {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const navigate = useNavigate();

// 	const handleLogin = async (e) => {
// 		e.preventDefault();
// 		const response = await fetch("http://127.0.0.1:8000/api/login/", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ username, password }),
// 		});

// 		if (response.ok) {
// 			onLogin();
// 			navigate("/");
// 		} else {
// 			alert("Login failed. Please check your credentials and try again.");
// 		}
// 	};

// 	return (
// 		<div className="login-container">
// 			<h2>Login</h2>
// 			<form onSubmit={handleLogin}>
// 				<div className="inputs">
// 					<label htmlFor="username">Username:</label>
// 					<input
// 						type="text"
// 						id="username"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						required
// 					/>
// 				</div>
// 				<div className="inputs">
// 					<label htmlFor="password">Password:</label>
// 					<input
// 						type="password"
// 						id="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</div>
				
// 					<button className="buttons" type="submit">Login</button>
				
// 			</form>
// 		</div>
// 	);
// }

// export default Login;
