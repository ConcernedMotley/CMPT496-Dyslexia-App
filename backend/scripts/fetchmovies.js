//this is a sample script to help me view the sample data when i created a cluster
//eventually will delete the movie data for now playing with it
//to run the script make sure the server is running with <node server.js>
//then run <node ./scripts/fetchMovies.js> in a different terminal


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    console.log("Using database:", mongoose.connection.db.databaseName);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

await connectDB();

// ✅ Correct way to get collection from MongoDB
const MovieCollection = mongoose.connection.db.collection("movies");

const fetchMovies = async () => {
  try {
    const movies = await MovieCollection.find({}).limit(5).toArray(); // ✅ FIXED
    console.log(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    mongoose.connection.close();
  }
};

fetchMovies();

