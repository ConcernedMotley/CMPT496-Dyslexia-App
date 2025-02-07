// src/components/OddActivity.jsx
import React, { useState, useEffect } from 'react';
import '../styles/OddActivityStyle.css';

function OddActivity() {
    const [selectedBox, setSelectedBox] = useState(null); //tracks the box user selects, null at init
    const [oddOneOutIndex, setOddOneOutIndex] = useState(null); //stores the index of the random "odd" box, init null
  
   //function to start a new game
  const generateNewGame = () => {
    setOddOneOutIndex(Math.floor(Math.random() * 4));//generate a random number that index will be the "odd" box
    setSelectedBox(null); //set selected box to null
  };

  //initialize the game
  useEffect(() => {
    generateNewGame();
  }, []); //runs only once because of [] at the end
    const checkAnswer = () => {
      if (selectedBox === oddOneOutIndex) { //if selected index is the same as odd index then win restart
        alert('Correct! You found the odd one out.');
        generateNewGame();

      } else {
        alert('Try again!'); //else nothing happens 
      }
    };
  
    return (
      <div className="odd-one-out-container">
        <h2>Find the Odd One Out!</h2>
        <div className="boxes">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`box ${selectedBox === index ? 'selected' : ''}`}
              onClick={() => setSelectedBox(index)}
            >
              {index === oddOneOutIndex ? '★' : '●'} {/* The odd one looks different */}
            </div>
          ))}
        </div>
        <button onClick={checkAnswer}>Check</button>
      </div>
    );
  }

export default OddActivity;