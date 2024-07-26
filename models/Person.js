const mongoose = require("mongoose");

//defining the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'], //only these values are allowed
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true  //no repetitions will be allowed
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true
    }
})

//creating the person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;