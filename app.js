const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const catsRouter = require('./routers/api/cats');
const volonteersRouter = require('./routers/api/volonteers');
const authRouter = require('./routers/api/auth');
const userRouter = require('./routers/api/users');

const app = express();
app.use(
  cors({
    // origin: ['https://oksanavovk.github.io', 'http://localhost:3000'],
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/cats', catsRouter);
app.use('/api/volonteers', volonteersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const path = require('path');

// Віддавати React build
app.use(express.static(path.join(__dirname, 'public', 'build')));

// Для всіх інших маршрутів (не API) віддавати index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

module.exports = app;
