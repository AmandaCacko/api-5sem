import { db } from '../config/firebase.js';

const Users = db.collection('users');

export const getUserCredits = async (req, res) => {
  try {
    const userDoc = await Users.doc(req.user.userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    res.json({ credits: userData.credits || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserCredits = async (req, res) => {
  const { credits } = req.body;

  try {
    const userRef = Users.doc(req.user.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRef.update({ credits });

    res.json({ message: 'Credits updated successfully', credits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
