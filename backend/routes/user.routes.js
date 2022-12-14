const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getProfile,
} = require('../controllers/user.controllers');
const {protectRoute} = require('../middlewares/auth.middleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getProfile);

module.exports = router;
