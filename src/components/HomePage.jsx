// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import '../styles/LandingPageStyle.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Dyslexia App</h1>
      <h1>Welcome to the Home Page</h1>
      <Link to="/RegisterPage">
        <button className="home-button">Register an Account</button>
      </Link>
      <Link to="/LoginPage">
        <button className="home-button">Login if you have an account</button>
      </Link>
    </div>
  );
}

export default HomePage;