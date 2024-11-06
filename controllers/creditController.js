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

// No seu controlador creditController.js
exports.purchase = async (req, res) => {
  try {
    const { amount } = req.body;

    // Lógica para processar a compra
    const user = await User.findById(req.user.userId);

    // Deduzir o valor da compra dos créditos do usuário
    user.credits -= amount;
    await user.save();

    res.json({ message: 'Compra realizada com sucesso', credits: user.credits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
