const express = require('express');
const router = express.Router();
const {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
} = require('../controllers/ticket.controllers');
const {protectRoute} = require('../middlewares/auth.middleware');

// Re-route into note router
const noteRouter = require('./note.routes');
router.use('/:ticketId/notes', noteRouter);

router
	.route('/')
	.get(protectRoute, getTickets)
	.post(protectRoute, createTicket);

router
	.route('/:id')
	.get(protectRoute, getTicket)
	.delete(protectRoute, deleteTicket)
	.put(protectRoute, updateTicket);
module.exports = router;
