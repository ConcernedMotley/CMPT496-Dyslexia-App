import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/general_style.css'; 

import passScreen from "../../assets/full-pass.svg";
import failScreen from "../../assets/full-fail.svg";

const EndGamePopup = ({ correctCount, wrongCount, onPlayAgain }) => {
    const isPass = correctCount >= 7;
    const resultImage = isPass ? passScreen : failScreen;

    const navigate = useNavigate();

  return (
    <div className="full-screen-popup">
      
      <img src={resultImage} alt={isPass ? "Pass Screen" : "Fail Screen"} className="full-screen-image" />
      <p className='final-score'>
    <span className={correctCount >= 7 ? 'green-text' : 'red-text'}>
            {correctCount}/10
        </span> Correct
        </p>
      <div className="replay-buttons">
        <button className="quit" onClick={() => navigate('/LandingPage')}>Go Home</button>
        <button onClick={onPlayAgain} className="again">
            Play Again
          </button>
          
        </div>
      
    </div>
  );
};

export default EndGamePopup;
