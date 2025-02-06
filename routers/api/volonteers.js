const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/volonteers');
const { ctrlWrapper } = require('../../middelwares');

router.get('/', ctrlWrapper(ctrl.getVolonteers));

module.exports = router;
