
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setError("Please fill all the fields");
    return;
  }

  if (!formData.email.includes("@")) {
    setError("Please enter a valid email");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    alert(data.message);
  } catch (error) {
    setError("Backend connection failed");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Fresh Feast</h1>

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join to us ! !
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn">
            Create Account
          </button>

        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;