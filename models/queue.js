const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  game: { type: String, required: true },
  players: [{ 
    user: { type: String, required: true }, // Nome do usuário
    dateTime: { type: Date, default: Date.now }, // Data e hora da inserção
    positionFila: { type: Number, required: true }, // Posição na fila
    console: { type: String, required: true } // Dado fixo do console
  }]
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;
