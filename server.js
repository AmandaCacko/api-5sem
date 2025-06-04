const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const creditRoutes = require('./routes/creditRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const { admin, db } = require('./firebase');

require('dotenv').config();

console.log('Conectado ao Firebase');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/queues', authMiddleware, queueRoutes);
app.use('/api/credits', authMiddleware, creditRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { db };
