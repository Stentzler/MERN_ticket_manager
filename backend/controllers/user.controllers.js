const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// @desc register new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
	const {name, email, password} = req.body;

	if (!name || !email || !password) {
		res.status(400).send({message: 'All fields required'});
	}

	const userExists = await User.findOne({email});
	if (userExists) {
		res.status(400).send({message: 'Email already registered'});
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res
			.status(201)
			.send({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
	} else {
		res.status(400).send({message: 'Invalid user data'});
	}
});

// @desc login user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	const user = await User.findOne({email});

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).send({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).send({message: 'Invalid credentials'});
	}
});

// @desc Get user profile
// @route /api/users/me
// @access private
const getProfile = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};

	res.status(200).send(user);
});

module.exports = {
	registerUser,
	loginUser,
	getProfile,
};

const generateToken = id => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '5d',
	});
};
