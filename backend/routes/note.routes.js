const express = require('express');
const router = express.Router({mergeParams: true});
const {getNotes, addNote} = require('../controllers/notes.controller');
const {protectRoute} = require('../middlewares/auth.middleware');

router.route('/').get(protectRoute, getNotes).post(protectRoute, addNote);

module.exports = router;
