const mongoose = require('mongoose');

const ps5QueueSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  user: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  positionFila: { type: Number, required: true },
  console: { type: String, required: true }
});

// Exporte o modelo corretamente
const PS5Queue = mongoose.model('PS5Queue', ps5QueueSchema);
module.exports = PS5Queue;
