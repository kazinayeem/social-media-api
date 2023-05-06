const mongoose = require("mongoose");

let localhost = "mongodb://localhost:27017/mywebsite";
const dbs = "mongodb+srv://kazinayeem55085:8hxvuD4JpsadO87w@cluster0.06x25aj.mongodb.net/?retryWrites=true&w=majority"


const pass = "8hxvuD4JpsadO87w"
const db = async () => {
  try {
    await mongoose.connect(dbs);
    console.log("database connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
