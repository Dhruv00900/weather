const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', weatherSchema);
