const { Cat } = require('../../models');

const getCats = async (req, res) => {
  const data = await Cat.find();
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = getCats;
