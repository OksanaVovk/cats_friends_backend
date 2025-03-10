const { User, Cat } = require('../../models');
const { NotFound } = require('http-errors');

const updateFavorite = async (req, res, next) => {
  const { catsId } = req.body;
  const { _id } = req.user;
  const catsData = await Cat.findById(catsId);
  if (!catsData) {
    throw new NotFound(`Cats with id=${catsId} not found`);
  }
  let favorite = req.user.favorite || [];
  const alreadyFavorite = favorite.some(item => item.id.toString() === catsId);
  if (!alreadyFavorite) {
    favorite.push({
      id: catsData._id,
      title: catsData.title,
      img: catsData.img,
    });
  } else {
    favorite = favorite.filter(item => item.id.toString() !== catsId);
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { favorite: favorite },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email: result.email,
        name: result.name,
        favorite: result.favorite,
      },
    },
  });
};

module.exports = updateFavorite;
