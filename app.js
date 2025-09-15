const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const catsRouter = require('./routers/api/cats');
const volonteersRouter = require('./routers/api/volonteers');
const authRouter = require('./routers/api/auth');
const userRouter = require('./routers/api/users');

const app = express();

// Enable CORS
app.use(
  cors({
    origin: ['https://oksanavovk.github.io', 'http://localhost:3000'],
    credentials: true,
  })
);

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/cats', catsRouter);
app.use('/api/volonteers', volonteersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Serve avatars as static files
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

// Global error handler
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
