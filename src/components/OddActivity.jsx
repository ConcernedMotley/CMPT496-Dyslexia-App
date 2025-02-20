// src/components/OddActivity.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OddActivityStyle.css';

function OddActivity() {

  const [movies, setMovies] = useState([]);
  const [gameMovies, setGameMovies] = useState([]); // Stores the three selected movies
  const [selectedBox, setSelectedBox] = useState(null); //tracks the box user selects, null at init
  const [oddOneOutIndex, setOddOneOutIndex] = useState(null); //stores the index of the random "odd" box, init null

  //get the words from backend
  const fetchMovies = async () => {
    try {
      //this works when accessing on the same device 
      //const response = await fetch('http://localhost:5001/api/movies');

      //trying to add my IP in so it goes to the network i am hosting on not local
      const response = await fetch('http://192.168.1.71:5001/api/movies'); //worked!!!!

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
      }
  };

  //function to start a new game
  const generateNewGame = () => {
    if (movies.length < 3) {
        console.error("Not enough movies to generate a game.");
        return;
    }

    // Group movies by genre
    const genreMap = {};
    movies.forEach((movie) => {
        const genreKey = movie.genres[0] || "Unknown"; // Use first genre
        if (!genreMap[genreKey]) genreMap[genreKey] = [];
        genreMap[genreKey].push(movie);
    });

    // Pick a genre that has at least 2 movies
    const genreKeys = Object.keys(genreMap).filter(key => genreMap[key].length >= 2);
    if (genreKeys.length === 0) {
        console.error("Not enough genres with at least 2 movies.");
        return;
    }

    const sameGenre = genreKeys[Math.floor(Math.random() * genreKeys.length)];
    const sameGenreMovies = genreMap[sameGenre].slice(0, 2); // Pick 2 movies from this genre

    // Pick an "odd" movie from a different genre
    const differentGenres = Object.keys(genreMap).filter(key => key !== sameGenre);
    if (differentGenres.length === 0) {
        console.error("No different genres available.");
        return;
    }

    const oddGenre = differentGenres[Math.floor(Math.random() * differentGenres.length)];
    const oddMovie = genreMap[oddGenre][0]; // Pick one movie from this genre

    // Combine and shuffle the movies
    const selectedMovies = [...sameGenreMovies, oddMovie].sort(() => Math.random() - 0.5);
    setGameMovies(selectedMovies);
    setOddOneOutIndex(selectedMovies.indexOf(oddMovie));
    setSelectedBox(null);

  console.log("Selected Movies:", selectedMovies);
  console.log("Odd One Out Index:", oddOneOutIndex);

};

  useEffect(() => {
      fetchMovies(); // Automatically loads movies on page load
  }, []);
  useEffect(() => {
    console.log("Movies fetched:", movies);
}, [movies]); // This will log whenever `movies` updates

  useEffect(() => {
    if (movies.length > 0) generateNewGame();
  }, [movies]);
  
  
  const checkAnswer = () => {
    if (selectedBox === oddOneOutIndex) {
      alert('Correct! You found the odd one out.');
      generateNewGame();
    } else {
      alert('Try again!');
    }
  };

  return (
    <div className="odd-one-out-container">
      <h2>Find the Odd One Out!</h2>
      
      <div className="boxes">
        {gameMovies.map((movie, index) => (
          <div
            key={movie._id}
            className={`box ${selectedBox === index ? 'selected' : ''}`}
            onClick={() => setSelectedBox(index)}
          >
            {movie.title} ({movie.genres[0]}) {/* Display title and first genre */}
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