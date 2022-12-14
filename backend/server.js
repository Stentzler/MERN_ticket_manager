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

app.get('/', (req, res) =>
	res.status(200).send({message: 'Welcome to the Ticket-app'})
);

// Routes
app.use('/api/users', require('./routes/user.routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
