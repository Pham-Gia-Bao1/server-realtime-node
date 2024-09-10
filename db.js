// db.js

const mongoose = require("mongoose");

// MongoDB URI từ biến môi trường
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://phamgiabao123abc:yAUtSfHSpb3ca6gD@phamgiabao.3djc0.mongodb.net/myDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
