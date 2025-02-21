// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';
import '../styles/LandingPageStyle.css';

//can i just do this page and just pass the level value?? rather than have diff 
function LevelLibrary() {
  return (
    <div className="landing-container">
        <h1>Level X!</h1>
        <h1>Pick an Activity!</h1>
      <Link to="/DragActivity">
        <button className="library-button">Go to Drag Activity Page</button>
      </Link>
      <Link to="/SoundActivity">
        <button className="library-button">Go to Sound Activity Page</button>
      </Link>
      <Link to="/OddActivity">
        <button className="library-button">Go to Odd one Out Activity Page</button>
      </Link>

      <Link to="/DraggingGame">
        <button className="library-button">Letter Dragging Game</button>
      </Link>

      <Link to="/PlayPage">
        <button className="play-button">Back to Play Page!</button>
      </Link>
    </div>
  );
}

export default LevelLibrary;