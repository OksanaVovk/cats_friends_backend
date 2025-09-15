const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;

const avatarsDir = path.join(__dirname, '../../public/avatars');

const updateAvatar = async (req, res) => {
  if (!req.file) {
    // File not provided in the request
    return res.status(400).json({ message: 'File not provided' });
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  try {
    // Ensure avatars folder exists
    await fs.mkdir(avatarsDir, { recursive: true });

    // Generate a unique file name
    const imageName = `${id}_${Date.now()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);

    // Copy file to avatars folder
    await fs.copyFile(tempUpload, resultUpload);

    // Remove temporary file
    await fs.unlink(tempUpload).catch(() => {});

    // URL for frontend
    const avatarUrl = `/avatars/${imageName}`;

    // Update user in the database
    await User.findByIdAndUpdate(id, { avatarUrl });

    // Respond with the avatar URL
    res.json({ avatarUrl });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateAvatar;
