const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();
var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongo DB connection Successful`);
});

db.on("error", () => {
  console.log(`Mongo DB connection Failed`);
});

module.exports = mongoose; 
 
