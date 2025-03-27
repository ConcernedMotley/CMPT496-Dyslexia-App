// src/components/LevelLibrary.jsx

/*This is the page where user selects a game after user selects levels  */

import { Link, useParams, useNavigate} from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/library_style.css';

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'

function LevelLibrary() {
  const {level} = useParams();

  return (
    <><NavBar /><div className="library-container">

      <h1 className='game-greet purple-text'>Level {level} Games</h1>

    <div className='tile-container'>
      {/*Button to 'Tick-Tally' (drag to match sounds game) */}
      <Link to={`/TickTally/${level}`}>
        <button className="library-button orange-b orange-button"><span>Tick-Tally</span></button>
      </Link>

      {/*Button to 'Word Snap' (letter drag game) */}
      <Link to={`/DraggingGame/${level}`}>
        <button className="library-button turq-b turquise-button"><span>Word Snap</span></button>
      </Link>

      {/*Button to 'Odd one out' (English words) */}
      <Link to={`/OddActivity/${level}/odd-one-out`}>
        <button className="library-button green-b green-button"><span>Odd one Out <span className='odd-desc'>(English-Words)</span></span></button>
        {/*TODO add the desc of the high score (would be dynamic maybe have some mock data above to pull)*/}
      </Link>

      {/*Button to 'Odd one out' (non words) */}
      <Link to={`/OddActivity/${level}/odd-non-word`}>
        <button className="library-button purp-b purple-button"><span>Odd one Out <span className='odd-desc'>(Non-Words)</span></span></button>
        {/*TODO add the desc of the high score (would be dynamic maybe have some mock data above to pull)*/}
      </Link>

      {/*Button to 'Card Game' (STT game that we will prob not have time to code the css) */}
      {/*Since not done just link to the same page.... ALSO this will show the hover effects cause button clicks and stays*/}
      <Link to={`/LevelLibrary/${level}`}>
        <button className="library-button turq-b turquise-button"><span>Card Game</span></button>
        {/*TODO add the desc of the high score (would be dynamic maybe have some mock data above to pull)*/}
      </Link>

      {/*TODO leaving this button here so it is even amount of game tiles  */}
      <Link to="/PlayPage">
        <button className="library-button orange-b orange-button"><span>Back to Play Page!</span></button>
        {/*TODO add the desc of idk return home (would be dynamic maybe have some mock data above to pull)*/}
      </Link>
      </div>
    </div>
    <BottomSprinkles className="landing-sprinkles" />
    </>
  );
}

export default LevelLibrary;