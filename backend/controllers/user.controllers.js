const asyncHandler = require('express-async-handler');

// @desc register new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
	const {name, email, password} = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('All fields required');
	}
	res.send('Resgister Route');
});

// @desc login user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
	res.send('Login Route');
});

module.exports = {
	registerUser,
	loginUser,
};
