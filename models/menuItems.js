const mongoose =require('mongoose');

const menuitem = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:["sweet","spicy","sour"]
    },
    ingredients:{
        type:[String],
        require:true
    },
    likes:{
        type:Number
    }
})

const menuItems = mongoose.model("menuitems",menuitem);
module.exports =menuItems;