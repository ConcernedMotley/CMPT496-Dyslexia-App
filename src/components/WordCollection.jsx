// src/components/WordCollection.jsx
import React, { useState, useEffect } from 'react';

import '../styles/wordcollectionstyle.css';

function WordCollection() {
    const [movies, setMovies] = useState([]);

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
    /****** will load the table on page load, 
    useEffect(() => {
        fetchMovies(); // Automatically loads movies on page load
    }, []);
    ***************/

    return (
        <div>
            <h2>Click the button to view the collection of words!</h2>
            <button onClick={fetchMovies}>Load Movies</button>

            <h2>Movie Collection</h2>

            <div className="table-container"> {/*want to add scroll table */}

                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</td>
                                <td>{movie.year || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default WordCollection;