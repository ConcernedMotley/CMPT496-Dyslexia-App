//

import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define a schema for movies
const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model('movies', movieSchema, 'movies');

// Route to get movies from MongoDB
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({}).limit(5); // Fetch 5 movies
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

export default router;