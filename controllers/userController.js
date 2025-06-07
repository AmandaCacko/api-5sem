import { db } from '../config/firebase.js';

const Users = db.collection('users');

export const getUser = async (req, res) => {
  try {
    const userDoc = await Users.doc(req.user.userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    delete userData.password;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const userRef = Users.doc(req.user.userId);
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;

    await userRef.update(updates);

    const updatedUser = await userRef.get();
    const userData = updatedUser.data();
    delete userData.password;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Users.doc(req.user.userId).delete();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
