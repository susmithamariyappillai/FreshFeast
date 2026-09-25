import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaApple,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("https://fresh-feast-44yj.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      alert(data.message);

      navigate("/menu");
    } catch (error) {
      setError("Backend connection failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1> Welcome Back</h1>

        <h2>Fresh Feast Restaurant</h2>

        

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="continue-text">
          Continue with
        </p>

        <div className="social-buttons">

          <button type="button" className="social-btn">
            <FaGoogle />
            Google
          </button>

          <button type="button" className="social-btn">
            <FaApple />
            Apple
          </button>

          <button type="button" className="social-btn">
            <FaPhoneAlt />
            Phone
          </button>

        </div>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;