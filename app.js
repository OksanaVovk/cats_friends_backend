// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const catsRouter = require('./routers/api/cats');
// const volonteersRouter = require('./routers/api/volonteers');
// const authRouter = require('./routers/api/auth');
// const userRouter = require('./routers/api/users');

// const app = express();
// app.use(
//   cors({
//     // origin: ['https://oksanavovk.github.io', 'http://localhost:3000'],
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(express.json());
// // app.use(express.static('public'));
// app.use(cookieParser());

// app.use('/api/cats', catsRouter);
// app.use('/api/volonteers', volonteersRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/users', userRouter);

// // app.use((_, res) => {
// //   res.status(404).json({ message: 'Not found' });
// // });
// // app.use((err, req, res, next) => {
// //   const { status = 500, message = 'Server error' } = err;
// //   res.status(status).json({ message });
// // });

// const path = require('path');

// // Статика React
// app.use(express.static(path.join(__dirname, 'public', 'build')));

// // Всі інші маршрути (не API) → index.html
// app.get('*', (req, res) => {
//   if (req.path.startsWith('/api/')) {
//     return res.status(404).json({ message: 'Not found' });
//   }
//   res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Server error' } = err;
//   res.status(status).json({ message });
// });
// module.exports = app;

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

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// JSON + cookie
app.use(express.json());
app.use(cookieParser());

// API маршрути
app.use('/api/cats', catsRouter);
app.use('/api/volonteers', volonteersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Статика аватарів
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

// Статика React build
const buildPath = path.join(__dirname, 'public', 'build');
app.use(express.static(buildPath));

// Всі інші маршрути (не API / avatars) → index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/avatars/')) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Глобальний error handler
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
