// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import '../styles/general_style.css';
import '../styles/home_style.css';

function HomePage() {
  return (
    
    <div className="home-container">
    <h1 className='title text-style-lexend-bold'>
      <span className="purple-text">Lumo</span>
      <span className="turquoise-text">Learn</span>
    </h1>
    <Link to="/LoginPage">
      <button className="login-button purple-button">Login</button>
    </Link>
    <Link to="/RegisterPage">
      <button className="register-button turquise-button ">New User</button>
    </Link>
  </div>

        
  );
}

export default HomePage;