import "./config/env.js";
import "./config/firebase.js";
import { db } from "./config/firebase.js"

import express from "express";
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/queues', authMiddleware, queueRoutes);
app.use('/api/credits', authMiddleware, creditRoutes);

const test = async () => {
  const doc = db.collection("test").doc("hello");
  await doc.set({ message: "Firebase funcionando 🔥" });
  console.log("✅ Documento criado no Firestore!");
};

async function testWhere() {
  const username = 'qualquercoisa';
  const userSnapshot = await db.collection('users').where('username', '==', username).get();
  console.log('userSnapshot empty?', userSnapshot.empty);
}

testWhere();
test();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));

