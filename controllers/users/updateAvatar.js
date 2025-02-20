const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', imageName);
    await User.findByIdAndUpdate(id, { avatarUrl });
    res.json({ avatarUrl });
  } catch {
    await fs.unlink(tempUpload);
    throw Error;
  }
};

module.exports = updateAvatar;
