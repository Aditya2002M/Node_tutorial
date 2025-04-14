// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define a new schema for the 'Person' collection
const personSchema = new mongoose.Schema({
    // 'name' field: a required string
    name: {
        type: String,
        require: true  // Note: should be 'required' instead of 'require'
    },
    // 'age' field: a number (not required)
    age: {
        type: Number
    },
    // 'work' field: a required string that must be one of the specified enum values
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"], // Restricts values to only these three
        require: true  // Note: should be 'required'
    },
    // 'email' field: a required and unique string
    email: {
        type: String,
        require: true,  // Note: should be 'required'
        unique: true    // Ensures no two people can have the same email
    },
    // 'mobile' field: a required string
    mobile: {
        type: String,
        require: true  // Note: should be 'required'
    },
    // 'address' field: an optional string
    address: {
        type: String
    },
    // 'salary' field: a required string
    salary: {
        type: String,
        require: true  // Note: should be 'required'
    }
});

// Create a Mongoose model named 'Person' using the defined schema
const person = mongoose.model('Person', personSchema);

// Export the model so it can be used in other parts of the application
module.exports = person;
