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
    return res.status(400).json({ message: 'File not provided' });
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    await fs.mkdir(avatarsDir, { recursive: true }); // переконатися, що папка існує
    const resultUpload = path.join(avatarsDir, imageName);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = `/avatars/${imageName}`; // для фронта краще URL через /
    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (err) {
    await fs.unlink(tempUpload).catch(() => {});
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateAvatar;
