// const { User } = require('../../models');
// const path = require('path');
// const fs = require('fs').promises;

// const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

// const updateAvatar = async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const { _id: id } = req.user;
//   const imageName = `${id}_${originalname}`;

//   try {
//     const resultUpload = path.join(avatarsDir, imageName);

//     await fs.rename(tempUpload, resultUpload);
//     const avatarUrl = path.join('avatars', imageName);
//     await User.findByIdAndUpdate(id, { avatarUrl });
//     res.json({ avatarUrl });
//   } catch {
//     await fs.unlink(tempUpload);
//     throw Error;
//   }
// };

// module.exports = updateAvatar;
const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;

const avatarsDir = path.join(__dirname, '../../public/avatars');

const updateAvatar = async (req, res) => {
  if (!req.file) {
    console.log('Файл не надійшов у req.file');
    return res.status(400).json({ message: 'File not provided' });
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  console.log('Отримано файл:', tempUpload, originalname);

  try {
    // Створюємо папку avatars, якщо її нема
    await fs.mkdir(avatarsDir, { recursive: true });
    console.log('Папка avatars перевірена/створена:', avatarsDir);

    // Унікальне ім'я файлу
    const imageName = `${id}_${Date.now()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);

    // Копіюємо файл у папку avatars
    await fs.copyFile(tempUpload, resultUpload);
    console.log('Файл скопійовано у:', resultUpload);

    // Видаляємо тимчасовий файл
    await fs.unlink(tempUpload).catch(() => {
      console.log('Не вдалося видалити тимчасовий файл:', tempUpload);
    });

    // Шлях для фронта
    const avatarUrl = `/avatars/${imageName}`;
    console.log('Avatar URL для фронта:', avatarUrl);

    // Оновлюємо користувача у БД
    await User.findByIdAndUpdate(id, { avatarUrl });
    console.log('Користувач оновлений у БД');

    res.json({ avatarUrl });
  } catch (err) {
    console.error('Помилка при збереженні аватара:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateAvatar;
