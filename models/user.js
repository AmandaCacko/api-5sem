const { db } = require('../firebase');
const Users = db.collection('users');

async function createUser(uid, data) {
  return await Users.doc(uid).set({
    username: data.username,
    email: data.email,
    password: data.password,
    credits: 0
  });
}

async function getUser(uid) {
  const doc = await Users.doc(uid).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function updateCredits(uid, credits) {
  return await Users.doc(uid).update({ credits });
}

module.exports = {
  createUser,
  getUser,
  updateCredits
};