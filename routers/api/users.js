const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const { ctrlWrapper, auth, validation } = require('../../middelwares');
const { favoriteSchema } = require('../../models/user');

const validateMiddlwarePatch = validation(
  favoriteSchema,
  'missing field favorite'
);

router.patch(
  '/favorite',
  auth,
  validateMiddlwarePatch,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
