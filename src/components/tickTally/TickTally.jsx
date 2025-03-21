import { func } from 'prop-types';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgressTracker from '../ProgressTracker';
import PlaySoundCard from './PlaySoundCard';
import SoundSlider from './SoundSlider';

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
        alert(isCorrect ? "Correct!" : "Incorrect!");

        if (isCorrect) {
            setSelectedWord(pickRandomWord()); // Pick a new word
            setSliderValue(0); // Reset slider
        }
    };

    useEffect(() => {
        setSelectedWord(pickRandomWord());
    }, [level]); // Run when level changes

    return (
        <div className='horizontal-flex'> 
            <div className='vertical-flex'>
                {/* <ProgressTracker /> */}
                <h1 className="title-font">Tick Tally</h1>
                {selectedWord && <PlaySoundCard word={selectedWord.word} />}
                <p>Selected Word: <strong>{selectedWord ? selectedWord.word : "Loading..."}</strong></p>

                <SoundSlider value={sliderValue} onChange={setSliderValue} />

                <button className='tally-done-btn' onClick={() => selectedWord && checkCountOnClick(selectedWord.soundCount, sliderValue)} >Done</button>
                
            </div>
        </div>
    );
};
