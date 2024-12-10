import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");
  //console.log("tokenn", token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: login,
      password: password,
    };
    axios
      .post("http://192.1.81.150:8080/v1/auth/login", payload, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // Assume the token is returned as part of the response
          const token = res.data.tokens.access.token;
          // console.log("token", token);
          // Store the token in localStorage
          localStorage.setItem("token", token);
          alert("Login successful");
          navigate("/"); // Redirect to homepage after successful login
        } else {
          alert("Unexpected response. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        alert(
          "Login failed: " +
            (err.response?.data?.message || "Please try again.")
        );
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              id="username"
              name="username"
              value={login}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="extra-options">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <p className="not-a-member">
            Not a member?{" "}
            <a href="#" className="sign-up-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
