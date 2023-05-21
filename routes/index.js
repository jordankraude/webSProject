const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/store', require('./store'))

module.exports = router;