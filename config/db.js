const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect(process.env.MongoDB);
  console.log("Mongo Connected");
};

module.exports = DBconnect;
