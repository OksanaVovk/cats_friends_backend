const { User } = require('../../models');
const { Conflict } = require('http-errors');

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({
    email,
    name,
  });

  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = register;
