const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDb Server connection success ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDb Server Issue ${error}`);
  }
};

module.exports = connectDb;
