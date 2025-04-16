const passport = require('passport'); // Correct import
const LocalStrategy = require('passport-local').Strategy; // Correct strategy
const person =require('./models/person')


passport.use( new LocalStrategy(async(USERNAME,password,done)=>{

    try {
        const user = await person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:"incorrect username"})
        }
        const isPasswordMatch = user.password == password ? true:false;

        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"incorrect password"})
        }
    } catch (error) {
        return done(error)
    }
    

}))

module.exports =passport
