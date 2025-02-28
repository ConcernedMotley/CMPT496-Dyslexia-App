//defines api endpoints for odd one out game
import express from 'express';
import OddOneOutWord from '../models/OddOneOutModel.js';

const router = express.Router();

// GET words for a specific level
//router.get('/api/odd-one-out', async (req, res) => {
router.get('/', async (req, res) => {

    try {
        const { level } = req.query;

        if (!level || !["1", "2", "3", "4"].includes(level)) {
            return res.status(400).json({ error: "Invalid level. Use 1, 2, 3, or 4." });
        }

        // Fetch the single document containing all levels
        const wordData = await OddOneOutWord.findOne();
        // Debugging: Log the response from MongoDB
        console.log("MongoDB Response:", wordData);

        if (!wordData || !wordData[level]) {
            return res.status(404).json({ error: "No words found for this level." });
        }

        res.json(wordData[level]); //return only the requested level's words
    } catch (error) {
        console.error("Error fetching Odd One Out words:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
