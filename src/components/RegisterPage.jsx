// src/components/RegisterPage.jsx
import { Link } from 'react-router-dom';
import { useState } from "react";
import '../styles/LandingPageStyle.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };


  return (
    <div className="register-container">
        <h1>Fill details to register</h1>
         <form onSubmit={handleSubmit} className="register-form">
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
                <button className="register-button">Go Back!</button>
            </Link>

             <Link to="/LoginPage">
                <button type="submit">Register!</button>
            </Link>
      </form>

    </div>
  );
}

export default RegisterPage;