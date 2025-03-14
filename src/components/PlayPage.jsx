// src/components/PlayPage.jsx
//page with the levels to pick
import { Link } from 'react-router-dom';
//import '../styles/LandingPageStyle.css';

function PlayPage() {
  return (
    <div className="play-container">
      <h1>Welcome to the Play Page</h1>
      <h1>Pick a Level</h1>
      <Link to="/LevelLibrary/1">
        <button className="play-button">Level 1 Games</button>
      </Link>
      <Link to="/LevelLibrary/2">
        <button className="play-button">Level 2 Games</button>
      </Link>
      <Link to="/LevelLibrary/3">
        <button className="play-button">Level 3 Games</button>
      </Link>
      <Link to="/LevelLibrary/4">
        <button className="play-button">Level 4 Games</button>
      </Link>

      <Link to="/LandingPage">
        <button className="play-button">Back to Landing Page!</button>
      </Link>
      
    </div>
  );
}

export default PlayPage;