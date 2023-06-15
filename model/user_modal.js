const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
   
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
  },
});
module.exports = mongoose.model("User", userSchema);
