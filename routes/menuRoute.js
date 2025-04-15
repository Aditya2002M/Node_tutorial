const express = require('express');
const router = express.Router();
const menuItems = require('../models/menuItems');

router.get('/menuitems',async(req,res)=>{
    try {
        const data = await menuItems.find();
        res.status(200).json(data)
    } catch (error) {
        console.log("error occured during fetching",error);
    }
})

router.post('/menuitems',async(req,res)=>{

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


router.put('/menuitems/:id',async(req,res)=>{
    try {
        const id =req.params.id;
        const newdata = req.body;
        const response = await menuItems.findByIdAndUpdate(id, newdata,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'menu not found' });
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
    
})

router.delete('/menuitems/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract the Menu's ID from the URL parameter
        
        // Assuming you have a MenuItem model
        const response = await menuItems.findOneAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports =router;