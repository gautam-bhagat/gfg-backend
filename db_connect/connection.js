const mongoose = require("mongoose");
require("dotenv").config();

//Set up default mongoose connection
const DB_URL = "mongodb://127.0.0.1:27017/GFGBCK?directConnection=true";
// const DB_URL = process.env.DB_URL;

const  connect = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));
};

module.exports = connect;

