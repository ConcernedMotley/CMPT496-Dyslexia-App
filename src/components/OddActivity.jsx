// src/components/OddActivity.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OddActivityStyle.css';

function OddActivity() {

  const [words, setWords] = useState([]);
  const [gameWords, setGameWords] = useState([]); //stores the three selected words
  const [selectedBox, setSelectedBox] = useState(null); //tracks the box user selects, null at init
  const [oddOneOutIndex, setOddOneOutIndex] = useState(null); //stores the index of the random "odd" box, init null

  //get the words from backend
  const fetchWords = async () => {
    try {
      //this works when accessing on the same device 
      //const response = await fetch('http://localhost:5001/api/movies');

      //trying to add my IP in so it goes to the network i am hosting on not local
      const response = await fetch('http://192.168.1.71:5001/api/odd-one-out?level=1'); //update level dynamically?

      if (!response.ok) {
        throw new Error('Failed to fetch words');
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
        console.error('Error fetching words:', error);
      }
  };

  //function to start a new round
  const generateNewGame = () => {
    if (words.length < 3) {
        console.error("Not enough words to generate a game.");
        return;
    }

    // Group words by the rhyme tag
    const tagMap = {};
    words.forEach((word) => {
        const tagKey = word.tag; 
        if (!tagMap[tagKey]) tagMap[tagKey] = [];
        tagMap[tagKey].push(word);
    });

    // Pick a tag that has at least 2 words
    const validTags = Object.keys(tagMap).filter((key) => tagMap[key].length >= 2);
    if (validTags.length === 0) {
      console.error("Not enough words with the same rhyme tag.");
      return;
    }

    const sameTag = validTags[Math.floor(Math.random() * validTags.length)];
    const sameTagWords = tagMap[sameTag].slice(0, 2); // Pick 2 words from this tag

    // Pick an "odd" word from a different tag
    const differentTags = Object.keys(tagMap).filter((key) => key !== sameTag);
    if (differentTags.length === 0) {
      console.error("No different tags available.");
      return;
    }
    const oddTag = differentTags[Math.floor(Math.random() * differentTags.length)];
    const oddWord = tagMap[oddTag][0]; // Pick one word from this tag

    // Combine and shuffle words
    const selectedWords = [...sameTagWords, oddWord].sort(() => Math.random() - 0.5);
    setGameWords(selectedWords);
    setOddOneOutIndex(selectedWords.indexOf(oddWord));
    setSelectedBox(null);

  console.log("Selected words:", selectedWords);

};

  useEffect(() => {
      fetchWords(); // Automatically loads movies on page load
  }, []);
  useEffect(() => {
    if (words.length > 0) generateNewGame();
    console.log("words fetched:", words);
}, [words]); // This will log whenever `movies` updates
  
  
  const checkAnswer = () => {
    if (selectedBox === oddOneOutIndex) {
      alert('Correct! You found the odd one out.');
      generateNewGame();
    } else {
      alert('Incorrect. Try again!'); //TODO idk i guess move onto new word
      generateNewGame();
    }
  };

  return (
    <div className="odd-one-out-container">
      <h2>Find the Odd One Out!</h2>
      
      <div className="boxes">
        {gameWords.map((word, index) => (
          <div
            key={word.word}
            className={`box ${selectedBox === index ? 'selected' : ''}`}
            onClick={() => setSelectedBox(index)}
          >
            {word.word} {/* Display just the word */}
          </div>
        ))}
      </div>
  
      <button onClick={checkAnswer}>Check</button>
      <Link to="/PlayPage">
       <button className="back-button">Go Back!</button>
      </Link>
    </div>
  );
  
}

export default OddActivity;