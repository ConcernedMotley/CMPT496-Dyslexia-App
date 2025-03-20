// src/components/LoginPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/register_style.css';
import '../styles/login_style.css';

import BottomSprinkles from '../components/BottomSprinkles';

import star from '../assets/star.svg';
import appleIcon from '../assets/apple.svg';
import googleIcon from '../assets/google.svg';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    navigate("/LandingPage");
  };


  return (
    <><><div className='greeting-container sign-greet'>
      <img className='star' src={star} alt="star" />
      <h1 className="create purple-text jump">Lets jump back in</h1>
      <p className='reg-desc sign-desc'>Sign in by filling in the boxes below</p>
    </div><div className="registration-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className='field login-field'>
            <div className="input-background"></div>
            <label htmlFor="username" className="input-label"></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Email or Username"
              required />
          </div>

          <div className="field login-field">
            <div className="input-background"></div>
            <label htmlFor="password" className="input-label"></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required />
          </div>
          <button className="signup-button turquise-button login-button" type="submit">Sign In</button>
        </form>

      </div></><div>
      <p className='other-reg-desc other-sign-desc'>Or sign in with</p>
        <div className="sign-buttons ">
        
          <button type="button" className="apple-button">
            <img className="apple-img" src={appleIcon} alt="Sign in with Apple" />
          </button>
          <button type="button" className="google-button">
            <img className="google-img" src={googleIcon} alt="Sign in with Google" />
          </button>
        </div>
        <BottomSprinkles className= 'login-sprinkles'/> 
      </div></>
  );
}

export default LoginPage;