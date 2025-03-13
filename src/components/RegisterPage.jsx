// src/components/RegisterPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/register_style.css';

import star from '../assets/star.svg';
import leftSprinkle from '../assets/left-sprinkle.svg';
import rightSprinkle from '../assets/right-sprinkle.svg';
import appleIcon from '../assets/apple.svg';
import googleIcon from '../assets/google.svg';


const RegisterPage = () => {

  const [formData, setFormData] = useState({username: "", password: "", repeatPassword: "" });
  const [showPopup, setShowPopup] = useState(false); //Popup visibility state default not showing
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //will now show the popup disclaimer
    setShowPopup(true);
  };

  //if they accept terms will "create" account allow to login
  const handleAccept = () => {
    setShowPopup(false);
    //TODO logic for form submission, if want to ?? add to DB
    console.log("Submitted Data:", formData);
    //now direct to login
    navigate("/LoginPage");
  }

  //if decline terms will stay on reg page wont create account
  const handleDecline = () => {
    setShowPopup(false); // Close popup and stay on current page
};


  return (
    <><div className='greeting-container'>
      <img className='star' src={star} alt="star"  />
      <h1 className="create purple-text">Lets create a new account</h1>
      <p className='reg-desc'>Create an account by filling in the boxes below</p>
    </div>
    <div className='registration-container'>
        <form onSubmit={handleSubmit} className="register-form">
          <div className='field'>
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

          <div className="field">
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

          <div className="field">
            <div className="input-background"></div>
            <label htmlFor="repeatPassword" className="input-label"></label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              required />
          </div>
          <button className="signup-button turquise-button" type="submit">Create Account</button>
        </form>


        <div >
          <p className='other-reg-desc'>Or sign up with</p>
          <div className="form-buttons">
          <button type="button" className="apple-button">
          <img className="apple-img" src={appleIcon} alt="Sign in with Apple" />
          </button>
          <button type="button" className="google-button">
          <img className="google-img" src={googleIcon} alt="Sign in with Google" />
          </button>
          </div>
        </div>
        <div className="terms-link">
          <Link to="/terms-and-conditions">Our Policy and Terms & Conditions</Link>
        </div>
        <div className='bottomSprinkles'>
        <img className="left-sprinkle" src={leftSprinkle} alt="Sprinkles" />
        <img className="right-sprinkle" src={rightSprinkle} alt="Sprinkles" />
        </div>


        {/*<Link to="/HomePage">
        <button className="register-button">Go Back!</button>
</Link>*/}
      {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2 className='disclaimer'>Privacy Disclaimer</h2>
                        <p className='terms'> LumoLearn collects limited data, including progress, answers, age, and engagement, to personalize 
                          learning and improve the app. We do not collect other personal information or share data with third 
                          parties. All data is securely stored and used only for research and educational purposes. By using the app, 
                          you consent to these practices. </p>
                          <p className='do-you'>Do you accept?</p>
                        <div className="popup-buttons">
                            <button onClick={handleDecline} className="decline-button">No</button>
                            <button onClick={handleAccept} className="accept-button">Yes</button>
                        </div>
                    </div>
                </div>
            )}


      </div></>
  );
}

export default RegisterPage;