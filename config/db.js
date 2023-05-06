const mongoose = require("mongoose");

let localhost = "mongodb://localhost:27017/mywebsite";

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
