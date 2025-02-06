const { Volonteer } = require('../../models');

const getVolonteers = async (req, res) => {
  const data = await Volonteer.find();
  res.status(200).json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = getVolonteers;
