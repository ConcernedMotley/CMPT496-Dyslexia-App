// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';
import '../styles/LandingPageStyle.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Dyslexia App</h1>
      <h1>Welcome to the Landing Page</h1>
      <Link to="/DragActivity">
        <button className="landing-button">Go to Drag Activity Page</button>
      </Link>
      <Link to="/SoundActivity">
        <button className="landing-button">Go to Sound Activity Page</button>
      </Link>
    </div>
  );
}

export default LandingPage;