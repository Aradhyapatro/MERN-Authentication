const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION);
  console.log("Mongo Connected");
};

module.exports = DBconnect;
