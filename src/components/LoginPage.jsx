// src/components/LoginPage.jsx
import { Link } from 'react-router-dom';
import { useState } from "react";
import '../styles/LandingPageStyle.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };


  return (
    <div className="login-container">
        <h1>Login</h1>
         <form onSubmit={handleSubmit} className="login-form">
            <label>Username:</label>
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            />

            <label>Password:</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />

            <Link to="/HomePage">
                <button className="login-button">Go Back!</button>
            </Link>

             <Link to="/LandingPage">
                <button type="submit">Login!</button>
            </Link>
      </form>

    </div>
  );
}

export default LoginPage;