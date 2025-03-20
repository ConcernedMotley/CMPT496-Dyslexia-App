// src/components/OddActivity.jsx

/**** TODO *************
- random algorithm could be better 
- clean up comments
- css 
- tracker communication
- popup for success/fail/new level
***********/
import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { getEmptyImage } from "react-dnd-html5-backend";

import '../styles/odd_style.css';
import '../styles/general_style.css';

import tutSymbol from '../assets/tut.svg'

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'
import TrackerSquares from '../components/TrackerSquares';
import OddTutorial from './tutorials/OddTutorial';

import API_BASE_URL from '../config'; //for connecting to backend


const ItemType = "box";

const DraggableBox = ({ word, index, isHidden }) => {

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemType,
    item: { word, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div 
      ref={drag} 
      className={`box box-${index} ${isDragging ? 'dragging' : ''}`} //added the classname here as below it wouldnt apply?
      style={{ 
        opacity: isDragging ? 0.0 : isHidden ? 0 : 1, //TODO drag image IDK aAAAA
        boxShadow: isDragging || isHidden ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.3)',
        transition: "opacity 0.0s ease-in-out",//so you dont see it in the corner made it 0
        touchAction: "none", // Prevents scrolling interference 

      }}
    >
      {word.word} 
    </div>
  );
};

const DropZone = ({ droppedWord, setDroppedWord }) => {
  //const DropZone = ({ onDrop }) => {
  //const [droppedItem, setDroppedItem] = useState(null);
  //const [isOver, setIsOver] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
  //const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      setDroppedWord(item); // Only update droppedWord state, don't modify gameWords
      //onDrop(item.index); // Notify parent that a box was dropped
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      //isOverCurrent: monitor.isOver(),

    }),
  }));

  /*useEffect(() => {
    setIsOver(isOverCurrent);
  }, [isOverCurrent]);*/


  return (
    <div ref={drop} className={` drop-zone ${isOver ? "hover" : ''}`}>
      {droppedWord ? (
        <div className="box dropped-box">{droppedWord.word.word}</div>) :(" ")}
    </div>
  );
};


function OddActivity() {
  const { level, type } = useParams(); //for difficulty (1-4) type non words or english

  const [showPopup, setShowPopup] = useState(true); //Popup visibility state default showing

  const [roundCount, setRoundCount] = useState(0); // Track rounds played
  const [correctCount, setCorrectCount] = useState(0); // Track correct answers
  const [wrongCount, setWrongCount] = useState(0); // Track wrong answers
  const [showEndPopup, setShowEndPopup] = useState(false); // Control end-of-game popup (ask to continue give score etc)

  const [words, setWords] = useState([]);
  const [gameWords, setGameWords] = useState([]); //stores the three selected words
  //const [selectedBox, setSelectedBox] = useState(null); //tracks the box user selects, null at init
  const [oddOneOutIndex, setOddOneOutIndex] = useState(null); //stores the index of the random "odd" box, init null

  const [droppedWord, setDroppedWord] = useState(null);

  const [trackerResults, setTrackerResults] = useState([]); // Track past results

  //close popup
  const handleAccept = () => {
    setShowPopup(false);
  }

  //get the words from backend
  /*const fetchWords = async () => {
    try {
      //this works when accessing on the same device 
      //const response = await fetch('http://localhost:5001/api/movies');

      //trying to add my IP in so it goes to the network i am hosting on not local
      //const response = await fetch('http://192.168.1.71:5001/api/odd-one-out?level=1'); //update level dynamically?
      //const response = await fetch('http://10.60.71.195:5001/api/odd-one-out?level=4');

      //odd path
      //const response = await fetch('http://192.168.1.71:5001/api/odd-non-word?level=4');

      //const response = await fetch(`http://192.168.1.71:5001/api/${type}?level=${level}`);

      //for hosted backend on render
      //https://cmpt496-dyslexia-app.onrender.com
      //const response = await fetch(`https://cmpt496-dyslexia-app.onrender.com/api/${type}?level=${level}`);
      //using the define
      console.log(import.meta.env.VITE_API_URL);
      const response = await fetch(`${API_BASE_URL}/api/${type}?level=${level}`);

      if (!response.ok) {
        throw new Error('Failed to fetch words');
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
        console.error('Error fetching words:', error);
      }
  };*/


  useEffect(() => {
    const fetchWords = async () => {
      try {
        //using the define
      console.log(import.meta.env.VITE_API_URL);
      const response = await fetch(`${API_BASE_URL}/api/${type}?level=${level}`);
        if (!response.ok) throw new Error('Failed to fetch words');
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };
    fetchWords();
  }, [level, type]);

  useEffect(() => {
    if (words.length > 0) generateNewGame();
  }, [words]);


  //function to start a new round
  const generateNewGame = () => {
    setDroppedWord(null); // Ensure no words are hidden when a new round starts
    
    if (words.length < 3) {
        console.error("Not enough words to generate a game.");
        return;
    }
    //TODO i would like to have a better randomization for the words
    //group by the rhyme tag
    const tagMap = {};
    words.forEach((word) => {
        if (!tagMap[word.tag]) tagMap[word.tag] = [];
        tagMap[word.tag].push(word);
    });

    //tag with at least 2 word (all should have but just incase)
    const validTags = Object.keys(tagMap).filter((key) => tagMap[key].length >= 2);
    if (validTags.length === 0) {
      console.error("Not enough words with the same rhyme tag.");
      return;
    }

    const sameTag = validTags[Math.floor(Math.random() * validTags.length)];
    const sameTagWords = tagMap[sameTag].slice(0, 2); //pick 2 words from this tag

    //pick an "odd" word from a different tag
    const differentTags = Object.keys(tagMap).filter((key) => key !== sameTag);
    if (differentTags.length === 0) {
      console.error("No different tags available.");
      return;
    }
    const oddTag = differentTags[Math.floor(Math.random() * differentTags.length)];
    const oddWord = tagMap[oddTag][0]; //pick one word from this tag

    //combine and shuffle words
    const selectedWords = [...sameTagWords, oddWord].sort(() => Math.random() - 0.5);
    setGameWords(selectedWords);
    setOddOneOutIndex(selectedWords.indexOf(oddWord));
    //setSelectedBox(null);
    setDroppedWord(null);
    //setPreviousWord(null);

};

const checkAnswer = () => {
  if (droppedWord) {
    let isCorrect = droppedWord.index === oddOneOutIndex;
    setTrackerResults(prev => [...prev, isCorrect]); // Add result to tracker
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      alert('Correct! You found the odd one out.');
    } else {
      setWrongCount(prev => prev + 1);
      alert('Incorrect. Try again!');
    }

    setRoundCount(prev => prev + 1); // Increment total rounds

    if (roundCount + 1 >= 10) { 
      //PUT the resets here so that they maintain for the game and each round but new game reset
      setShowEndPopup(true); // Show popup after 10 rounds
      setRoundCount(0);      // Reset round count
    setCorrectCount(0);    // Reset correct answers
    setWrongCount(0);      // Reset wrong answers
    setTrackerResults([]); // Reset tracker results
    } else {
      generateNewGame(); // Start new round if <10 rounds
    }
  }
};


  return (
    <><NavBar />
    
    {showPopup && (
                <div className="popup-game-overlay">
                    <div className="popup-game-box">
                        <h2 className='game-title'>Odd-One-Out</h2>

                        <p className='instruction'> Three words will be displayed on the screen. Drag 
                                          the word that does not rhyme into the box below! </p>
                        <div className="popup-button">
                            <button onClick={handleAccept} className="next-button purple-button">Next</button>
                        </div>
                    </div>
                </div>
            )}
      <TrackerSquares trackerResults={trackerResults} />

    
    
    <div className="odd-one-out-container">
      <div className='title-help-container'>
        <h1 className='purple-text game-header'>Odd-One-Out </h1>
        {/*TODO tutorial button to click will retrigger tutorial */}
        <OddTutorial />
        {/*<img className='tut-symb' src={tutSymbol} alt="Help Button" />*/}
        </div>
      <p className='game-desc-box'>Drag the word that does not rhyme into the box below! Score 7/10 or higher to get the next round. </p>
      
      {/*TODO little game description box, maybe can use the popup text box and just squish it? */}

      <div className='plate-container'>
        <div className="dot">
          <div className="boxes">
            {/* Only render words that are NOT in the drop zone */}
            {gameWords.map((word, index) => (
              <DraggableBox 
                
                key={word.word} 
                word={word} 
                index={index} 
                isHidden={droppedWord && droppedWord.word.word === word.word} 
                //className={`box box-${index}`} THIS DOESNT WORK
              />
            ))}
          </div>
        </div>
        <div className="dropzone-container"> 
        <DropZone 
          droppedWord={droppedWord} 
          setDroppedWord={setDroppedWord} 
          setGameWords={setGameWords}
          />
         
          </div>

          </div>

           
    </div>
    <button className='check-button' onClick={checkAnswer}>Done</button>

        {/*<Link to="/PlayPage">
          TODO remove the back button and idk have the arrow?? make nav bar clickable 
          <button className="back-button done-button">Go Back!</button>
        </Link>*/}
      
   


              {/* ✅ SCOREBOARD 
      <div className="scoreboard">
        <p>Rounds: {roundCount} / 10</p>
        <p>✅ Correct: {correctCount}</p>
        <p>❌ Wrong: {wrongCount}</p>
      </div>*/}

    

    {/* ✅ END-OF-GAME POPUP (PLACED HERE) */}
    {showEndPopup && (
      <div className="popup-game-overlay">
        <div className="popup-game-box">
          <h2 className='game-title'>Game Over!</h2>
          <p className='instruction'>
            You played 10 rounds! 🎉<br />
            ✅ Correct Answers: {correctCount} <br />
            ❌ Wrong Answers: {wrongCount}
          </p>
          <div className="popup-button">
            <button 
              onClick={() => {
                setRoundCount(0);
                setCorrectCount(0);
                setWrongCount(0);
                setShowEndPopup(false);
                generateNewGame(); // Restart game
              }} 
              className="next-button purple-button"
            >
              Play Again
            </button>
            <Link to="/PlayPage">
              <button className="back-button">Quit</button>
            </Link>
          </div>
        </div>
      </div>
    )}



    <BottomSprinkles className="landing-sprinkles" />
    </>
  );
  
}

export default OddActivity;