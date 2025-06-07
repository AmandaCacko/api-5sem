import { db } from '../config/firebase.js';

const VRQueue = db.collection('vrQueue');

async function addVREntry(data) {
  return await VRQueue.add({
    user: data.user,
    dateTime: new Date(),
    positionFila: data.positionFila,
    console: data.console
  });
}

async function getVRQueue() {
  const snapshot = await VRQueue.orderBy('positionFila').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  addVREntry,
  getVRQueue
};