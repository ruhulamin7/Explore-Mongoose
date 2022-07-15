const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;
