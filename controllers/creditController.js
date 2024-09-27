const User = require('../models/user');

exports.getCredits = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ credits: user.credits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCredits = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    user.credits += amount;
    await user.save();
    res.json({ credits: user.credits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
