const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  phone: String,
  password: String,
  address: {
    cep: String,
    number: String,
    complement: String,
  },
});

module.exports = mongoose.model("User", UserSchema);