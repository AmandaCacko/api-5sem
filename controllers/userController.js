const User = require('../models/user');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
