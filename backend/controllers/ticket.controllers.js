const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Ticket = require('../models/tickets.model');
const ticketsModel = require('../models/tickets.model');

// @desc register new ticket
// @route GET /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
	const {product, description, status} = req.body;

	if (!product || !description) {
		return res
			.status(400)
			.send({message: 'Please add product and description  '});
	}

	const user = await User.findById(req.user.id);
	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
		status: 'new',
	});

	res.status(201).send(ticket);
});

// @desc Get user tickets
// @route POST /api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const tickets = await Ticket.find({user: req.user.id});

	return res.status(200).send(tickets);
});

// @desc Get user single ticket by id
// @route POST /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		return res.status(404).send({message: 'Ticket not found'});
	}

	if (ticket.user.toString() !== req.user.id) {
		return res
			.status(401)
			.send({message: 'This ticket does not belong to this user'});
	}

	return res.status(200).send(ticket);
});

// @desc Delete ticket
// @route DELETE /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		return res.status(404).send({message: 'Ticket not found'});
	}

	if (ticket.user.toString() !== req.user.id) {
		return res
			.status(401)
			.send({message: 'This ticket does not belong to this user'});
	}

	await ticket.remove();

	return res.status(204).send('');
});

// @desc Update ticket
// @route PATCH /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		return res.status(404).send({message: 'Ticket not found'});
	}

	if (ticket.user.toString() !== req.user.id) {
		return res
			.status(401)
			.send({message: 'This ticket does not belong to this user'});
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true}
	);

	return res.status(200).send(updatedTicket);
});

module.exports = {
	getTickets,
	createTicket,
	getTicket,
	updateTicket,
	deleteTicket,
};
