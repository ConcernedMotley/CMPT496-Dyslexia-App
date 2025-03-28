// src/components/OddActivity.jsx

/**** TODO *************
- random algorithm could be better 
***********/
import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { getEmptyImage } from "react-dnd-html5-backend";

import '../styles/odd_style.css';
import '../styles/general_style.css';

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'
import TrackerSquares from '../components/TrackerSquares';
import OddTutorial from './tutorials/OddTutorial';
import AnswerBadge from "./repeated-components/AnswerBadge";
import EndGamePopup from "./repeated-components/EndGamePopup"

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
        //TODO fix the ghost animation so it renders and follows finger 
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      setDroppedWord(item); // Only update droppedWord state, don't modify gameWords
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

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
  const [oddOneOutWord, setOddOneOutWord] = useState(null);
  const [droppedWord, setDroppedWord] = useState(null);

  const [trackerResults, setTrackerResults] = useState([]); // Track past results

  const [showBadge, setShowBadge] = useState(false);//display right or wrong badge 
  const [badgeInfo, setBadgeInfo] = useState({ isCorrect: 0, correctWord: "" });//word to be displayed when wrong

  //close popup
  const handleAccept = () => {
    setShowPopup(false);
  }

  //get the words from backend
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
    setOddOneOutWord(oddWord); // Store the word
    setDroppedWord(null);
};

const checkAnswer = () => {
  if (droppedWord) {
    console.log("Dropped Word:", droppedWord.word.word);
    console.log("Odd One Out Word:", oddOneOutWord.word);

    let isCorrect = droppedWord.word.word === oddOneOutWord.word;
    console.log('Is Answer Correct?', isCorrect);
    setTrackerResults(prev => [...prev, isCorrect]); // Add result to tracker
    
    setBadgeInfo({ isCorrect: isCorrect ? 1 : 0, correctWord: oddOneOutWord.word });
    setShowBadge(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }

    setRoundCount(prev => prev + 1); // Increment total rounds

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
        {/*TODO tutorial play on first time user play game, button to click will retrigger tutorial */}
        <OddTutorial />
        </div>
      <p className='game-desc-box'>Drag the word that does not rhyme into the box below! Score 7/10 or higher to get the next round. </p>

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
        generateNewGame();
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

export default OddActivity;