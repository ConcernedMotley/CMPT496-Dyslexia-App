// src/components/RegisterPage.jsx
import { Link } from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/register_style.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ 
      username: "", password: "", repeatPassword: "" });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    //TODO logic for form submission
    console.log("Submitted Data:", formData);
  };


  return (
    <><div className='greeting'>
      <h1 className="purple-text">Lets create a new account</h1>
      <p className='reg-desc'>Create an account by filling in the boxes below</p>
    </div><div className='registration-container'>
        <form onSubmit={handleSubmit} className="register-form">
          <div className='field'>
            <div className="input-background"></div>
            <label htmlFor="username" className="input-label">Email or Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Email or Username"
              required />
          </div>

          <div className="field">
            <div className="input-background"></div>
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required />
          </div>

          <div className="field">
            <div className="input-background"></div>
            <label htmlFor="repeatPassword" className="input-label">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              required />
          </div>
          {/*<Link to="/LoginPage">
          <button className='register turquise-button' type="submit">Create Account</button>
    </Link>*/}
          <button className="signup-button" type="submit">Create Account</button>
        </form>


        <div >
          <p className='other-reg-desc'>Or sign up with</p>
          <div className="form-buttons">
          <button type="button" className="apple-button">Apple</button>
          <button type="button" className="google-button">Google</button>
          </div>
        </div>
        <div className="terms-link">
          <Link to="/terms-and-conditions">Our Policy and Terms & Conditions</Link>
        </div>


        {/*<Link to="/HomePage">
        <button className="register-button">Go Back!</button>
</Link>*/}



      </div></>
  );
}

export default RegisterPage;