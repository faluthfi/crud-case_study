// import express router
const express = require('express');

const router = express.Router();

// import controllers
const auth = require('../controller/auth');
const apirestrict=require('../middlewares/apirestrict')
const keyRestrict=apirestrict.needKey

// routes list
router.post('/register',keyRestrict, auth.register);
router.post('/login',keyRestrict, auth.login);

// export router
module.exports = router;
