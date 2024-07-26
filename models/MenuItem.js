const mongoose = require("mongoose");

//defining the schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        required: true,
        enum: ["sweet", "sour", "salty", "spicy"]
    },
    is_drink: {
        type: Boolean,
        required: false,
        default: false //default value is false unless stated otherwise
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

//creating the menuItem model
const MenuItem = mongoose.model('MenuIten', menuItemSchema);
module.exports = MenuItem;