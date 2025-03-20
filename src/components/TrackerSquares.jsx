//component for the tracking of right and wrong answers
import React from "react";
import "../styles/general_style.css"; // style is in general

//TODO 
const TrackerSquares = ({ trackerResults }) => {
    console.log({trackerResults})
    return (
      <div className="tracker-container">
        <div className="tracker-row">
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={index} 
            className={`tracker-square ${trackerResults[index] === true ? 'correct' : ''} ${trackerResults[index] === false ? 'wrong' : ''}`}
          />
        ))}
        </div>

        <p className="tracker-text">{trackerResults.length}/10</p> {/* Dynamically update count */}
        
      </div>

    );
  };
        

export default TrackerSquares;