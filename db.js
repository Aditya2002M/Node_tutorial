// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the MongoDB connection string (URL)
// 'hotels' is the name of the database to connect to
const mongoDbURL = "mongodb://localhost:27017/hotels";

// Connect mongoose to the specified MongoDB URL
mongoose.connect(mongoDbURL);

// Store the connection instance in a variable for easier reference
const db = mongoose.connection;

// Event listener: Triggered when the connection to MongoDB is successfully established
db.on('connected', () => {
    console.log(`Connected to mongoDB server`);
});

// Event listener: Triggered when the connection to MongoDB is lost/disconnected
db.on('disconnected', () => {
    console.log(`Disconnected from mongoDB server`);
});

// Event listener: Triggered when there's an error while connecting to MongoDB
db.on('error', () => {
    console.log(`MongoDB connection error`);
});

// Export the database connection object so it can be used in other files
module.exports = db;
