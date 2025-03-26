import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { Link, useParams } from 'react-router-dom';
import LetterGrid from './draggingGame/LetterGrid';
import DroppableBox from './draggingGame/DroppableBox';
import AudioIcon from './AudioIcon';
import '../styles/DraggingGame.css';
import '../styles/pageStyle.css';
import Popup from 'reactjs-popup';
import { set } from 'mongoose';
import PlaySoundCard from './draggingGame/PlaySoundCard';
import PopUpBox from './PopUpBox';

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'
import TrackerSquares from '../components/TrackerSquares';
import OddTutorial from './tutorials/OddTutorial';
import AnswerBadge from "./repeated-components/AnswerBadge";
import EndGamePopup from "./repeated-components/EndGamePopup"

 //close popup
 const handleAccept = () => {
  setShowPopup(false);
}

export default function DraggingGame() {
  const { level } = useParams();
  const [showPopup, setShowPopup] = useState(true);

  const [trackerResults, setTrackerResults] = useState([]); // Track past results
  const [roundCount, setRoundCount] = useState(0); // Track rounds played
  const [correctCount, setCorrectCount] = useState(0); // Track correct answers
  const [wrongCount, setWrongCount] = useState(0); // Track wrong answers
  const [showEndPopup, setShowEndPopup] = useState(false); // Control end-of-game popup (ask to continue give score etc)
  const [showBadge, setShowBadge] = useState(false);//display right or wrong badge 
  const [badgeInfo, setBadgeInfo] = useState({ isCorrect: 0, correctWord: "" });//word to be displayed when wrong

  const [activeLetter, setActiveLetter] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [dragOverMessage, setDragOverMessage] = useState("");
  const [boxContents, setBoxContents] = useState(Array(4).fill(''));
  const [popupMessage, setPopupMessage] = useState("");
  const [boxColors, setBoxColors] = useState(Array(4).fill('')); // New state for box colors

    //close popup
    const handleAccept = () => {
      setShowPopup(false);
    }  

  useEffect(() => {
    setCurrentWord(RandomWord()); // Set a new word when the component mounts
  }, []);

  const updateBoxContent = (index, content) => {
    setBoxContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index] = content;
      return newContents;
    });
    setBoxColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = '#1F7E8E'; // Change color when letter is dropped (lightgreen color code)
      return newColors;
    });
  };

  const handleDragStart = (event) => {
    setActiveLetter(event.active.id.split('-')[1]);
  };

  const handleDragOver = (event) => {
    if (event.over) {
      console.log("Drop Zone ID:", event.over.id, "Position:", event.over.rect);
    }
  };

  const handleDragEnd = (event) => {
    setActiveLetter(null);
    setDragOverMessage("");

    if (event.over && event.over.id.split('-')[0] === "dropBox") {
      const dropBoxId = event.over.id.split('-')[1];
      const letter = event.active.data.current.letter;
      console.log(`${letter} on box ${dropBoxId}`);
      updateBoxContent(parseInt(dropBoxId), letter);
    }
  };

  const handleDoneClick = () => {
    const formedWord = boxContents.join('').toLowerCase();
    const isCorrect = formedWord === currentWord;
    setTrackerResults(prev => [...prev, isCorrect]); // Add result to tracker
    
    
    setBadgeInfo({ isCorrect: isCorrect ? 1 : 0, correctWord: currentWord});
    setShowBadge(true); 
    console.log(isCorrect);

    console.log("correct word:");
    console.log(currentWord);
    if (isCorrect) {
      //setPopupMessage("Correct word");
      //alert("Correct word");
      /************
      setCurrentWord(RandomWord());
      setBoxContents(Array(4).fill(''));
      *******************/
      // window.location.reload();
      setCorrectCount(prev => prev + 1);//tracker correct
    } else {
      setWrongCount(prev => prev + 1); //tracker wrong
      //alert("Incorrect word");
    }
    setRoundCount(prev => prev + 1); // Increment total rounds
  };

  return (
    <><NavBar />

  {showPopup && (
    <PopUpBox instructions="Get ready to listen, snap, and match! Hear the words, grab the letters,
                                                  and drop them where they belong. Let's go!"
      handleAccept={handleAccept} gameTitle="Word Snap"  />)}
      
    <TrackerSquares trackerResults={trackerResults} />

    <DndContext 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
    <div className='title-help-container'>
      <h1 className='title-font purple-text game-header spacing'>Word-Snap</h1>
      <OddTutorial />
                </div>
                <div className='horizontal-flex'>
      <div className="vertical-flex drag-flex" style={{ touchAction: 'none' }}>
        {currentWord && (
        <div className="card-wrapper-drag"> 
        <PlaySoundCard word={currentWord} />
        </div>)}
            
        {/* <AudioIcon word={currentWord} /> {/* Pass the current word */}
        <LetterGrid currentWord={currentWord} arraySize={9} />
        <DroppableBox
          count={4}
          maxCount={6}
          boxContents={boxContents}
          updateBoxContent={updateBoxContent}
          boxColors={boxColors} // Pass the box colors to DroppableBox
        />
        <p>{dragOverMessage}</p> {/* Display drag over message */}
        <button className='snap-done-btn' onClick={handleDoneClick}>Done</button>
      </div>
      </div>

      {/* Drag overlay for better movement */}
      <DragOverlay>
        {activeLetter ? (
          <div className="letter-box dragging">
            <p className="letter-font">{activeLetter.split('-')[0]}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>

    {showBadge && (
      <AnswerBadge 
      result={badgeInfo.isCorrect} 
      correctAnswer={badgeInfo.correctWord} 
      onClose={() => {
        setShowBadge(false);
        if (roundCount + 1 >= 11) { 
          setShowEndPopup(true); // Show popup after 10 rounds
          //don't reset yet or the endgame popup wont display the score/10 
        }
        // Start new round
        //generateNewGame();
        //TODO is this how the game is reset
        setCurrentWord(RandomWord());
        setBoxContents(Array(4).fill(''));
      }}
    />
    )}

    {showEndPopup && (
      <EndGamePopup
        correctCount={correctCount}
        wrongCount={wrongCount}
        onPlayAgain={() => {
          setRoundCount(0);
          setCorrectCount(0);
          setWrongCount(0);
          setTrackerResults([]); // Reset tracker results
          setShowEndPopup(false);
          generateNewGame(); // Restart game
        }}
      />
    )}

    <BottomSprinkles className="landing-sprinkles" />
    </>
  );
}

function RandomWord() {
  const wordsList = [
    'book', 'tree', 'game', 'star', 'lamp'
  ];

  const wordIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[wordIndex];
}
