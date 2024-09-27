const Queue = require('../models/queue');

exports.getQueues = async (req, res) => {
  try {
    const queues = await Queue.find().populate('players', 'username');
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQueue = async (req, res) => {
  const { name, platform, game } = req.body;
  try {
    const queue = new Queue({ name, platform, game });
    await queue.save();
    res.status(201).json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id).populate('players', 'username');
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);
    if (!queue.players.includes(req.user.userId)) {
      queue.players.push(req.user.userId);
      await queue.save();
    }
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.leaveQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);
    queue.players = queue.players.filter(player => player.toString() !== req.user.userId);
    await queue.save();
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
