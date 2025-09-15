// const multer = require('multer');
// const path = require('path');

// const tmpDir = path.join(__dirname, '../', 'tmp');

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tmpDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
//   limits: { fileSize: 2 * 1024 * 1024 },
// });

// module.exports = upload;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tmpDir = path.join(__dirname, '../tmp');

// Створюємо папку, якщо її нема
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    // унікальне ім'я файлу
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
