// src/components/OddActivity.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/OddActivityStyle.css';
import API_BASE_URL from '../config'; //for connecting to backend


function OddActivity() {
  const { level, type } = useParams();

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
  };

  //function to start a new round
  const generateNewGame = () => {
    if (words.length < 3) {
        console.error("Not enough words to generate a game.");
        return;
    }

    //group by the rhyme tag
    const tagMap = {};
    words.forEach((word) => {
        const tagKey = word.tag; 
        if (!tagMap[tagKey]) tagMap[tagKey] = [];
        tagMap[tagKey].push(word);
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
    setSelectedBox(null);

  console.log("Selected words:", selectedWords);

};

  useEffect(() => {
      fetchWords(); //auto loads movies on page load
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
      <h1>Odd Activity ({type}) - Level {level}</h1>
      <h2>Find the Odd One Out!</h2>

      <div className='plate-container'>
        <div className="dot">

        <div className="boxes">
        {gameWords.map((word, index) => (
          <div
            key={word.word}
            className={`box box-${index} ${selectedBox === index ? 'selected' : ''}`}
            onClick={() => setSelectedBox(index)}
          >
            {word.word} {/* Display just the word */}
          </div>
        ))}
      </div>
      </div>
      </div>
  
  
      <button onClick={checkAnswer}>Check</button>
      <Link to="/PlayPage">
       <button className="back-button">Go Back!</button>
      </Link>
    </div>
  );
  
}

export default OddActivity;