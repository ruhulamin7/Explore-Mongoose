const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testMongoose');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;
