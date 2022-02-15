// import express router
const express = require('express');

const router = express.Router();

// import controllers
const apiKey = require('../controller/apikey');

// routes list
router.post('/create', apiKey.createNewKey);

// export router
module.exports = router;
