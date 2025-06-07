import dotenv from "dotenv";
import firebaseAdmin from "firebase-admin";

dotenv.config();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = firebaseAdmin.firestore();

console.log("🔌 Firebase Firestore conectado");

export { firebaseAdmin as admin, db };
