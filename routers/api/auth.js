const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { ctrlWrapper, validation, auth } = require('../../middelwares');
const { registerSchema, loginSchema } = require('../../models/user');

const validateMiddlwareRegister = validation(
  registerSchema,
  'Error from Joi or another validation library'
);
const validateMiddlwareLogin = validation(
  loginSchema,
  'Error from Joi or another validation library'
);

router.post('/register', validateMiddlwareRegister, ctrlWrapper(ctrl.register));
router.post('/login', validateMiddlwareLogin, ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/refresh', auth, ctrlWrapper(ctrl.refresh));

module.exports = router;
