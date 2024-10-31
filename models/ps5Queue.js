const mongoose = require('mongoose');

const ps5QueueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  game: { type: String, required: true },
  players: [{ 
    user: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    positionFila: { type: Number, required: true },
    console: { type: String, required: true }
  }]
});

// Exporte o modelo corretamente
const PS5Queue = mongoose.model('PS5Queue', ps5QueueSchema);
module.exports = PS5Queue;
