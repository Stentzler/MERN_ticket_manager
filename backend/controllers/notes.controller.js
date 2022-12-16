const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Note = require('../models/note.model');
const Ticket = require('../models/tickets.model');

// @desc Get ticket notes
// @route GET /api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (!ticket) {
		return res.status(404).send({message: 'Ticket not found'});
	}

	if (ticket.user.toString() !== req.user.id) {
		return res.status(401).send({message: 'Not Authorized'});
	}

	const notes = await Note.find({ticket: req.params.ticketId});

	return res.status(200).send(notes);
});

// @desc create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access private
const addNote = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).send({message: 'User not found'});
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (!ticket) {
		return res.status(404).send({message: 'Ticket not found'});
	}

	if (ticket.user.toString() !== req.user.id) {
		return res.status(401).send({message: 'Not Authorized'});
	}

	const note = await Note.create({
		text: req.body.text,
		isStaff: false,
		user: req.user.id,
		ticket: req.params.ticketId,
	});

	return res.status(200).send(note);
});

module.exports = {
	getNotes,
	addNote,
};
