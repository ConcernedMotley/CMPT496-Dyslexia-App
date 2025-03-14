import React from 'react';
import '../styles/bottom_sprinkles.css';  // Import the CSS file
import leftSprinkle from '../assets/left-sprinkle.svg';
import rightSprinkle from '../assets/right-sprinkle.svg';

const BottomSprinkles = ({ className }) => {
    return (
      <div className={`bottomSprinkles ${className}`}>
        <img className="left-sprinkle" src={leftSprinkle} alt="Sprinkles" />
        <img className="right-sprinkle" src={rightSprinkle} alt="Sprinkles" />
      </div>
    );
  };
export default BottomSprinkles;