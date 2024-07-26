//managing endpoints
//managing routes for the person model
const express = require('express');
const router = express.Router();
const Person = require("../models/Person"); //importing the person model

//creating a person
router.post("/", async function (req, res) {
    try {
      const data = req.body; //assuming req.body contains the person data coming from the bodyParser
  
      //create a new person document using the mongoose model
      const newPerson = new Person(data);
  
      //saving the new person to the database
      const savedPerson = await newPerson.save();
      console.log("data saved");
      res.status(200).json(savedPerson);
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal server error"});
    }
  });

  //getting all the persons
router.get('/', async (req, res) => {
    try {
        //getting each person from the database
        const allPersons = await Person.find();
        res.send(allPersons);
    } catch (error) {
        console.log("Error fetching persons: ", error);
        res.status(500).json({error: 'Internal server error'});
    }
})

//getting details of the person based on the work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work:workType});
            console.log("Response sent");
            res.status(200).json(response);
        } else {
            res.status(400).json({error: "Invalid work type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

//updating a person
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //extracting the id from the url
        const data = req.body; //this the data to be updated
        const response = await Person.findByIdAndUpdate(personId, data, {
            new: true, //return the updated document
            runValidators: true, //run mongoose validation
        })
        //if the response is null
        if (!response) {
            return res.status(400).json({error:"Person not found"})
        }
        console.log("Data updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

//deleting a person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(400).json({error: "Person not found"});
        }
        console.log("Data deleted");
        res.status(200).json({message: "resource deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router;