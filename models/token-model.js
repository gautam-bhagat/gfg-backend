const mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema({
  uid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token  = mongoose.model('Token',TokenSchema);

module.exports = Token
