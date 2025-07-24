const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: String,
  name: String,
  logs: [Date], // when user completed it
});

module.exports = mongoose.model('Habit', HabitSchema);
