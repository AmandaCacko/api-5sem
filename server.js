const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const creditRoutes = require('./routes/creditRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studiogames', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/credits', creditRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
