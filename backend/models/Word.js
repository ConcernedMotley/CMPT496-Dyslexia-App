//Schema for words collection (Defines how words are stored)

//TODO change this up this is just generated slop
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  phonemes: [String],
  ipa: String,
  audio_url: String,
  category: String,
  difficulty: Number
});

module.exports = mongoose.model('Word', WordSchema);
