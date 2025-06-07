import { db } from '../config/firebase.js';

const Queues = db.collection('queues');

export const getQueues = async (req, res) => {
  try {
    const snapshot = await Queues.get();
    const queues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQueue = async (req, res) => {
  const { name, platform, game } = req.body;
  try {
    const newQueue = await Queues.add({
      name,
      platform,
      game,
      players: [],
    });
    const queueDoc = await newQueue.get();
    res.status(201).json({ id: queueDoc.id, ...queueDoc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQueuesByConsole = async (req, res) => {
  const { console } = req.params;
  try {
    const snapshot = await Queues.where('platform', '==', console).get();
    const queues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQueuesByUser = async (req, res) => {
  const { username } = req.params;
  try {
    const snapshot = await Queues.where('players', 'array-contains', username).get();
    const queues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const joinQueue = async (req, res) => {
  const { id } = req.params;
  try {
    const queueRef = Queues.doc(id);
    const queueDoc = await queueRef.get();
    if (!queueDoc.exists) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    const queueData = queueDoc.data();
    const players = queueData.players || [];
    if (players.find(player => player.user === req.user.username)) {
      return res.status(400).json({ message: 'User already in queue' });
    }
    players.push({
      user: req.user.username,
      dateTime: new Date(),
      positionFila: players.length + 1,
      console: queueData.platform,
    });
    await queueRef.update({ players });
    res.json({ message: 'Joined queue successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const leaveQueue = async (req, res) => {
  const { id } = req.params;
  try {
    const queueRef = Queues.doc(id);
    const queueDoc = await queueRef.get();
    if (!queueDoc.exists) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    const queueData = queueDoc.data();
    let players = queueData.players || [];
    const playerIndex = players.findIndex(player => player.user === req.user.username);
    if (playerIndex === -1) {
      return res.status(400).json({ message: 'User not in queue' });
    }
    players.splice(playerIndex, 1);
    // Update positionFila for remaining players
    players = players.map((player, index) => ({
      ...player,
      positionFila: index + 1,
    }));
    await queueRef.update({ players });
    res.json({ message: 'Left queue successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
