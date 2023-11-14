const mongoose = require("mongoose");

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  image: {
    type: String,
  },
  gmail: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  instagram: {
    type: String,
  },
  priority: {
    type: Number,
  },
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
