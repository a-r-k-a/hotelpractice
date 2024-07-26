//managing routes for munu item model
const express = require('express');
const router = express.Router();
const MenuItem = require("../models/MenuItem"); //importing the menuItem model

//creating a menu item
router.post('/', async function (req, res) {
    try {
        //retrieving the data from the body
        const data = req.body;

        //creating a new item
        const newItem = new MenuItem(data);

        //saving item in the database
        const savedItem = await newItem.save();
        console.log("data saved");
        // res.status(200).json({message: "Request created"});
        res.status(200).json(savedItem);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

//getting all the menuItems
router.get('/', async (req, res) => {
    try {
        //getting each person from the database
        const allItems = await MenuItem.find();
        res.send(allItems);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"});
    }
})

//getting menu items on the basis of taste
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sweet' || taste == 'sour' || taste=='salty' || taste == 'spicy') {
            const response = await MenuItem.find({taste:taste});
            console.log("response sent");
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "Taste not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Invalid server error"});
    }
})

module.exports = router;
