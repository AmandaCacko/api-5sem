const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const creditRoutes = require('./routes/creditRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const cors = require('cors');

// Leitura da senha do arquivo db.txt
const db_password = fs.readFileSync('./db.txt', 'utf8').trim();
const uri = `mongodb+srv://amandacacko:<db_password>@api5sem.4uu9e.mongodb.net/?retryWrites=true&w=majority&appName=api5sem`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/queues', authMiddleware, queueRoutes);
app.use('/api/credits', authMiddleware, creditRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
