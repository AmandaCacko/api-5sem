// middleware/creditMiddleware.js
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    // Busca o usuário no banco de dados com base no id do usuário da requisição
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o usuário tem créditos suficientes
    const { amount } = req.body; // Assumindo que você está passando um valor de 'amount' no corpo da requisição
    if (user.credits < amount) {
      return res.status(400).json({ message: 'Créditos insuficientes' });
    }

    // Se a verificação passar, o fluxo continua
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
