const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DBS,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("database connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
