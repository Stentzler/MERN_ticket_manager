const {application} = require('express');
const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/user.controllers');

router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;
