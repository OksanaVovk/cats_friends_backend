const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/cats');
const { ctrlWrapper } = require('../../middelwares');

router.get('/', ctrlWrapper(ctrl.getCats));

module.exports = router;
