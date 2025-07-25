const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // for now plain (we'll hash later)
});

module.exports = mongoose.model('User', UserSchema);
