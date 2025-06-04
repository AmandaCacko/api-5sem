const { db } = require('../firebase');
const XboxQueue = db.collection('xboxQueue');

async function addXboxEntry(data) {
  return await XboxQueue.add({
    user: data.user,
    dateTime: new Date(),
    positionFila: data.positionFila,
    console: data.console
  });
}

async function getXboxQueue() {
  const snapshot = await XboxQueue.orderBy('positionFila').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  addXboxEntry,
  getXboxQueue
};