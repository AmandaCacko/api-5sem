const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  console.log("Dados recebidos para login:", req.body); // Log dos dados recebidos
    
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log("Usuário encontrado:", user); // Log do usuário encontrado
    if (!user) {
      return res.status(400).json({ message: 'Invalid user or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Senha corresponde:", isMatch); // Log da verificação da senha
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid user or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error("Erro ao fazer login:", err); // Log do erro
    res.status(500).json({ error: 'Erro interno do servidor', details: err.message }); // Adicione detalhes do erro
  }
};
