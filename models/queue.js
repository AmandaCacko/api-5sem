const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Queue', queueSchema);
