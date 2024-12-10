import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import PrivateRoute from "./Components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  const isLoggedIn = localStorage.getItem("token"); // Check if token exists in localStorage

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Route for login page */}
        <Route path="/login" element={<Login />} />

        {/* Protect home page with PrivateRoute */}
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
