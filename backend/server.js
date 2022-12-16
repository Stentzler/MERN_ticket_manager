const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {connectDB} = require('./config/db');
const cors = require('cors');

//Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/tickets', require('./routes/ticket.routes'));
app.use('/api/users', require('./routes/user.routes'));

// Production ENV
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
	);
} else {
	app.get('/', (req, res) =>
		res.status(200).send({message: 'Welcome to the Ticket-app'})
	);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
