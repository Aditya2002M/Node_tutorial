
const express = require('express');

const app = express();

const PORT = 3000;


const personRoute = require('./routes/personRoute');
const menuRoute = require('./routes/menuRoute');

const db = require('./db');


const passport =require('./auth')


const bodyParser = require('body-parser');
app.use(bodyParser.json());







app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})





app.get('/',localAuthMiddleware,(req,res)=>{
    res.send("welcome to server")
})

app.use('/',personRoute)
app.use('/',menuRoute)


// Start the server and listen on the defined PORT
app.listen(PORT, () => {
    // Log a message to the console indicating the server has started
    console.log(`server started at PORT :${PORT}`);
});




