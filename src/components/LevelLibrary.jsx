// src/components/LandingPage.jsx
import { Link, useParams } from 'react-router-dom';
import '../styles/LandingPageStyle.css';

//can i just do this page and just pass the level value?? rather than have diff 
function LevelLibrary() {
  const {level} = useParams();
  return (
    <div className="landing-container">
        <h1>Level {level}!</h1>
        <h1>Pick an Activity!</h1>
      <Link to={`/DragActivity/${level}`}>
        <button className="library-button">Go to Drag Activity Page</button>
      </Link>
      <Link to={`/SoundActivity/${level}`}>
        <button className="library-button">Go to Sound Activity Page</button>
      </Link>
      <Link to={`/OddActivity/${level}/odd-one-out`}>
        <button className="library-button">Go to Odd one Out Activity Page</button>
      </Link>
      <Link to={`/OddActivity/${level}/odd-non-word`}>
        <button className="library-button">Go to Odd one Out Activity (Non-Words) Page</button>
      </Link>

      <Link to={`/DraggingGame/${level}`}>
        <button className="library-button">Letter Dragging Game</button>
      </Link>


      <Link to="/PlayPage">
        <button className="play-button">Back to Play Page!</button>
      </Link>
    </div>
  );
}

export default LevelLibrary;