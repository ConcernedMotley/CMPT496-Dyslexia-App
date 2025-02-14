//API endpoints for words

const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new word
router.post('/', async (req, res) => {
  const word = new Word(req.body);
  try {
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
