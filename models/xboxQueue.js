const mongoose = require('mongoose');

const xboxQueueSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  user: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  positionFila: { type: Number, required: true },
  console: { type: String, required: true }
  });

  const XboxQueue = mongoose.model('XboxQueue', xboxQueueSchema);
  module.exports = XboxQueue;
