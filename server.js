//Main backend server file (Express.js)

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './backend/config/database.js';
import moviesRoutes from './backend/routes/movies.js'; // Import movies route


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors()); //this enables cors for all origins (temp)

const PORT = process.env.PORT || 5001; // Use 5001 if PORT is not set in .env

//use the movies API route 
//TODO will need to change once doing other collection
app.use('/api/movies', moviesRoutes);

//local only with this i couldnt interact with db on tablet
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));



