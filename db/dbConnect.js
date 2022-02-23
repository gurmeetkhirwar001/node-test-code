const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/userDb");
    console.log("mongodb connected");
  } catch (e) {
    console.log(e, "Error In connecting Database");
  }
};

module.exports = connectDB;
