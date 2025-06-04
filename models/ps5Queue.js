const { db } = require('../firebase');
const PS5Queue = db.collection('ps5Queue');

async function addPS5Entry(data) {
  return await PS5Queue.add({
    user: data.user,
    dateTime: new Date(),
    positionFila: data.positionFila,
    console: data.console
  });
}

async function getPS5Queue() {
  const snapshot = await PS5Queue.orderBy('positionFila').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  addPS5Entry,
  getPS5Queue
};