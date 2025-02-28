//defines how the words are stored in the DB
import mongoose from 'mongoose';

const OddOneOutSchema = new mongoose.Schema({
    1: { type: Array, default: [] }, // Level 1 words
    2: { type: Array, default: [] }, // Level 2 words
    3: { type: Array, default: [] }, // Level 3 words
    4: { type: Array, default: [] }, // Level 4 words
});

const OddOneOutWord = mongoose.model('OddOneOutWord', OddOneOutSchema, 'odd_one_out_bank'); // Explicit collection name

export default OddOneOutWord;
