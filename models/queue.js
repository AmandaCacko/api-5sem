import { db } from '../config/firebase.js';

const Queue = db.collection('queues');

async function createQueue(data) {
  return await Queue.add({
    name: data.name,
    platform: data.platform,
    game: data.game,
    players: [],
  });
}

async function addPlayerToQueue(queueId, playerData) {
  const queueRef = Queue.doc(queueId);
  const doc = await queueRef.get();

  if (!doc.exists) return null;

  const currentPlayers = doc.data().players || [];

  await queueRef.update({
    players: [
      ...currentPlayers,
      {
        user: playerData.user,
        dateTime: new Date(),
        positionFila: currentPlayers.length + 1,
        console: playerData.console,
      },
    ],
  });

  return true;
}

async function getQueue(queueId) {
  const doc = await Queue.doc(queueId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export { createQueue, addPlayerToQueue, getQueue };
