const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  birthDate: String,
  gender: String,
  addressLine1: String,
  addressLine2: String,
  country: String,
  city: String,
  region: String,
  postalCode: String,
});

module.exports = mongoose.model("User", userSchema);
