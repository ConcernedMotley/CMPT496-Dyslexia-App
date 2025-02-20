// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';
import '../styles/LandingPageStyle.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Dyslexia App</h1>
      <h1>Welcome to the Landing Page</h1>
      <Link to="/PlayPage">
        <button className="landing-button">Go to Play Page</button>
      </Link>
      
      <Link to="/WordCollection">
        <button className="landing-button">View Word Collection</button>
      </Link>
    </div>
  );
}

export default LandingPage;