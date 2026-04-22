const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error('MongoDB connection error: MONGO_URL is not defined.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;