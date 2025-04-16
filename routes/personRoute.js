const express = require('express');

const router =express.Router()

const person = require('../models/person');


// router.get('/',(req,res)=>{
//     res.send("welcome to server")
// })
router.get('/person',async(req,res)=>{
    try {
        const data = await person.find();
        res.status(200).json(data)
    } catch (error) {
        console.log("error occured during fetching",error);
    }
})

// Define a POST route to create and save a new person to the database
router.post('/person', async (req, res) => {
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


router.get('/person/:workType',async(req,res)=>{
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

router.put('/person/:id',async(req,res)=>{
    try {
        const id =req.params.id;
        const newdata = req.body;
        const response = await person.findByIdAndUpdate(id, newdata,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
    
})


router.delete('/person/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await person.findOneAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;