// Import the express module to create an Express application
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port number where the server will listen for requests
const PORT = 3000;

// Import the database connection logic from db.js
const db = require('./db');

// Import the Mongoose model/schema for 'person' from the models folder
const person = require('./models/person');
const menuItems = require('./models/menuItems');

// Import body-parser middleware to parse JSON request bodies
const bodyParser = require('body-parser');
// Use body-parser middleware to automatically parse JSON data in incoming requests
app.use(bodyParser.json());

// Define a basic GET route for the root URL
app.get('/', (req, res) => {
    // Send a simple response message when the root route is accessed
    res.send(`hello i am server`);
});

app.get('/person',async(req,res)=>{
    try {
        const data = await person.find();
        res.status(200).json(data)
    } catch (error) {
        console.log("error occured during fetching",error);
    }
})

// Define a POST route to create and save a new person to the database
app.post('/person', async (req, res) => {
    try {
        // Extract the JSON data sent in the request body
        const data = req.body;

        // Create a new instance of the person model with the incoming data
        const newPerson = new person(data);

        // Save the new person object to the database (async operation)
        const response = await newPerson.save();

        // Log a success message to the console
        console.log("data saved successfully");

        // Send a JSON response indicating success
        res.status(200).json({ message: "data stored successfully" });

    } catch (error) {
        // If there's an error, log it to the console
        console.log(error);

        // Send a 500 Internal Server Error response with an error message
        res.status(500).json({ error: "internal server error" });
    }
});


app.get('/person/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType == "chef" || workType == "waiter" || workType == "manager"){
            const response = await person.find({work:workType});
            console.log("person found");
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error
        })
    }
})


app.get('/menuitems',async(req,res)=>{
    try {
        const data = await menuItems.find();
        res.status(200).json(data)
    } catch (error) {
        console.log("error occured during fetching",error);
    }
})

app.post('/menuitems',async(req,res)=>{

    try {
        const data = req.body;
        const newmenu = new menuItems(data);
        const response = await newmenu.save();
        console.log("menu saved successfully");
        res.status(200).json({ message: "menu stored successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
    
})

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
    // Log a message to the console indicating the server has started
    console.log(`server started at PORT :${PORT}`);
});
