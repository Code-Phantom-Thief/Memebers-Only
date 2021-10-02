require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const MongoDB_Connection = require('./config/db');

const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter');
const messageRouter = require('./routes/messageRouter');

const app = express();

app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://mern-members-only.netlify.app',
		],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

MongoDB_Connection();

app.get('/', (req, res) => {
    res.send('This is works!!!');
});

app.use('/auth', authRouter);
app.use('/message', messageRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})