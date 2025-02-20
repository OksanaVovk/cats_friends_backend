const refresh = async (req, res) => {
  const { email, name, favorite, token, avatarUrl } = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
        name,
        favorite,
        avatarUrl,
      },
      token,
    },
  });
};

module.exports = refresh;
