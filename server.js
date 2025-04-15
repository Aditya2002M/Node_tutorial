// Import the express module to create an Express application
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port number where the server will listen for requests
const PORT = 3000;

const personRoute = require('./routes/personRoute');
const menuRoute = require('./routes/menuRoute');
// Import the database connection logic from db.js
const db = require('./db');

// Import the Mongoose model/schema for 'person' from the models folder


// Import body-parser middleware to parse JSON request bodies
const bodyParser = require('body-parser');
// Use body-parser middleware to automatically parse JSON data in incoming requests
app.use(bodyParser.json());

// Define a basic GET route for the root URL

app.use('/',personRoute)
app.use('/',menuRoute)


// Start the server and listen on the defined PORT
app.listen(PORT, () => {
    // Log a message to the console indicating the server has started
    console.log(`server started at PORT :${PORT}`);
});


//adding comment-notes for each lines

