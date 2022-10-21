import "./Register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post("/auth/register/", {
        username,
        email,
        password,
      });
      response.data && window.location.replace("/login/");
      console.log(response);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main className="register">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <label>Username</label>
        <input
          className="register-input"
          type="text"
          placeholder="Create a username..."
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="register-input"
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="register-input"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
      <button className="register-login">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && <span>{error}</span>}
    </main>
  );
};

export default Register;
