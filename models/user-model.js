const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile : {
    type: String,
    required: true,
  },
  verified : {
    type : Boolean
  },
  clgstudent : {
    type : Boolean
  },
  createdAt : { type : Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
