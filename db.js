//file for setting up database connection
const mongoose = require('mongoose');

//connection url
const mongoURL = 'mongodb://localhost:27017/hotels'; //hotels--database_name

//setting up the connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//default connection object
const db = mongoose.connection;

//event listener for database connection
db.on('connected', () => {
    console.log("Connected to MongoDb server");
});

//event listener for error
db.on('error', (err) => {
    console.log("Mongodb connection error: ", err)
});

//event listener for disconnect
db.on('disconnected', () => {
    console.log('MongoDb disconnected');
})

//exporting the database connection
module.exports = db;