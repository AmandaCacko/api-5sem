const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function criarUsuario() {
  try {
    await db.collection('users').doc('1').set({
      username: 'admin',
      email: 'admin@email.com',
      password: 'admin'
    });
    console.log('Usuário criado!');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

criarUsuario();

module.exports = { admin, db };
