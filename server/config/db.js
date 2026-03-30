const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // already connected
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    throw error; // let caller handle it
  }
};

module.exports = connectDB;
