const mongoose = require('mongoose');

const vrQueueSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  user: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  positionFila: { type: Number, required: true },
  console: { type: String, required: true }
  });
  

const VRQueue = mongoose.model('VRQueue', vrQueueSchema);
module.exports = VRQueue;