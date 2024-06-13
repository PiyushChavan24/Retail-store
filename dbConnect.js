/** @format */

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const URL = process.env.MONGODB_URI; // Read MongoDB URI from environment variables

mongoose.connect(URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
 console.log("MongoDB Connection Successful");
});

connectionObj.on("error", (err) => {
 console.log("MongoDB Connection Failed");
 console.error(err); // Log the error for debugging
});

module.exports = connectionObj;
