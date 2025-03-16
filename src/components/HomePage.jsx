// src/components/HomePage.jsx
//css for the most part done
import { Link } from 'react-router-dom';
import '../styles/general_style.css';
import '../styles/home_style.css';

import Sprinkles from '../assets/sprinkles.svg';
import leftRac from '../assets/left-rac.svg';
import rightRac from '../assets/right-rac.svg';

function HomePage() {
  return (
    
    <div className="home-container">
      <img className='sprinkles' src={Sprinkles} alt="sprinkles"  />

    <h1 className='title text-style-lexend-bold'>
      <span className="purple-text">Lumo</span>
      <span className="turquoise-text">Learn</span>
    </h1>
    <img className='left-rac' src={leftRac} alt="left raccoon"  />
    <img className='right-rac' src={rightRac} alt="right raccoon"  />
    <div className='button-container'>
    <Link to="/LoginPage">
      <button className="login-button purple-button">Login</button>
    </Link>
    <Link to="/RegisterPage">
      <button className="register-button turquise-button ">New User</button>
    </Link>
    </div>

  </div>

        
  );
}

export default HomePage;