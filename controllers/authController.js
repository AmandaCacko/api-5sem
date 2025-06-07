import { db } from '../config/firebase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Users = db.collection('users');
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userSnapshot = await Users.where('username', '==', username).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = Users.doc();
    await newUserRef.set({
      email,
      username,
      password: hashedPassword,
      credits: 0,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Erro no register:", err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await Users.where('username', '==', username).get();
    if (userSnapshot.empty) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: userDoc.id, username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: err.message });
  }
};
