import { func } from 'prop-types';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgressTracker from '../ProgressTracker';
import PlaySoundCard from './PlaySoundCard';
import SoundSlider from './SoundSlider';

import BottomSprinkles from '../../components/BottomSprinkles';
import NavBar from '../../components/NavBar'
import TrackerSquares from '../../components/TrackerSquares';
import OddTutorial from '.././tutorials/OddTutorial';
import AnswerBadge from ".././repeated-components/AnswerBadge";
import EndGamePopup from ".././repeated-components/EndGamePopup"

// Placeholder JSON data
const placeholderWords = {
    "1": [
        { "word": "cat", "soundCount": 3, "difficulty": 1 },
        { "word": "dog", "soundCount": 3, "difficulty": 1 },
        { "word": "pig", "soundCount": 3, "difficulty": 1 },
        { "word": "bat", "soundCount": 3, "difficulty": 1 },
        { "word": "hat", "soundCount": 3, "difficulty": 1 },
        { "word": "mat", "soundCount": 3, "difficulty": 1 },
        { "word": "ox", "soundCount": 2, "difficulty": 1 }
    ],
    "2": [
        { "word": "apple", "soundCount": 4, "difficulty": 2 },
        { "word": "pencil", "soundCount": 5, "difficulty": 2 },
        { "word": "rabbit", "soundCount": 5, "difficulty": 2 },
        { "word": "sunset", "soundCount": 6, "difficulty": 2 },
        { "word": "winter", "soundCount": 5, "difficulty": 2 }
    ],
    "3": [
        { "word": "elephant", "soundCount": 6, "difficulty": 3 },
        { "word": "umbrella", "soundCount": 6, "difficulty": 3 },
        { "word": "butterfly", "soundCount": 6, "difficulty": 3 },
        { "word": "mountain", "soundCount": 6, "difficulty": 3 },
        { "word": "dinosaur", "soundCount": 6, "difficulty": 3 },
    ],
    "4": [
        { "word": "football", "soundCount": 6, "difficulty": 4 },
        { "word": "airplane", "soundCount": 6, "difficulty": 4 },
        { "word": "popcorn", "soundCount": 6, "difficulty": 4 },
        { "word": "sunshine", "soundCount": 6, "difficulty": 4 },
        { "word": "firework", "soundCount": 6, "difficulty": 4 }
    ]
};


export default function TickTally(){

    const { level } = useParams();
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedWord, setSelectedWord] = useState(null);

    const [showPopup, setShowPopup] = useState(true); //Popup visibility state default showing
    const [trackerResults, setTrackerResults] = useState([]); // Track past results
    const [roundCount, setRoundCount] = useState(0); // Track rounds played
    const [correctCount, setCorrectCount] = useState(0); // Track correct answers
    const [wrongCount, setWrongCount] = useState(0); // Track wrong answers
    const [showEndPopup, setShowEndPopup] = useState(false); // Control end-of-game popup (ask to continue give score etc)

  const [showBadge, setShowBadge] = useState(false);//display right or wrong badge 
  const [badgeInfo, setBadgeInfo] = useState({ isCorrect: 0, correctWord: "" });//word to be displayed when wrong

    //close popup
    const handleAccept = () => {
        setShowPopup(false);
    }

    const pickRandomWord = () => {
        const words = placeholderWords[level] || [];
        if (words.length > 0) {
            return words[Math.floor(Math.random() * words.length)];
        }
        return null;
    };

    function checkCountOnClick() {
        if (!selectedWord) return;

        const isCorrect = selectedWord.soundCount === sliderValue;
        setTrackerResults(prev => [...prev, isCorrect]); // Add result to tracker
        //alert(isCorrect ? "Correct!" : "Incorrect!");
        //TODO middle of getting badge to show
        console.log(selectedWord.soundCount);
        setBadgeInfo({ isCorrect: isCorrect ? 1 : 0, correctWord: selectedWord.soundCount.toString() });
        
        setShowBadge(true);

        if (isCorrect) {
            //setSelectedWord(pickRandomWord()); // Pick a new word
            //setSliderValue(0); // Reset slider
            setCorrectCount(prev => prev + 1);//tracker correct
        } else{
            setWrongCount(prev => prev + 1); //tracker wrong
        }

        setRoundCount(prev => prev + 1); // Increment total rounds
    };

    useEffect(() => {
        setSelectedWord(pickRandomWord());
    }, [level]); // Run when level changes

    return (
        <><NavBar />

        {showPopup && (
            <div className="popup-game-overlay">
            <div className="popup-game-box">
                <h2 className='game-title'>Tick-Tally</h2>

                <p className='instruction'> Hear a word, count its sounds (phonemes), and mark the right number. Let's go! </p>
                <div className="popup-button">
                    <button onClick={handleAccept} className="next-button purple-button">Next</button>
                </div>
            </div>
        </div>

        )}
        <TrackerSquares trackerResults={trackerResults} />
        
        
        <div className='horizontal-flex'>
            <div className='vertical-flex'>
                {/* <ProgressTracker /> */}
                <div className='title-help-container'>
                <h1 className="title-font purple-text game-header'">Tick-Tally</h1>
                <OddTutorial />
                </div>
                {selectedWord && <PlaySoundCard word={selectedWord.word} />}
                {/*TODO remove the selected word?? */}
                <p>Selected Word: <strong>{selectedWord ? selectedWord.word : "Loading..."}</strong></p>

                <SoundSlider value={sliderValue} onChange={setSliderValue} />

                <button className='tally-done-btn ' onClick={() => selectedWord && checkCountOnClick(selectedWord.soundCount, sliderValue)}>Done</button>

            </div>
        </div>

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
                setSelectedWord(pickRandomWord()); // Pick a new word
                setSliderValue(0); // Reset slider
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
};
