const Message = require('../models/Message');
const User = require('../models/User');

const {
	createMessageSchema,
	updateMessageSchema,
} = require('../middleware/validator');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const mongoose = require('mongoose');
const JWT_ACCESSTOKEN_SECRET =
	process.env.JWT_ACCESSTOKEN_SECRET;

exports.getAllMessage = async (req, res) => {
	try {
		const messages = await Message.find()
			.populate('author', 'username')
			.sort({ updatedAt: -1 });

		return res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getMessage = async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);

		if (!message)
			return res
				.status(404)
				.json({ message: 'Sorry, message not found...' });
		res.status(200).json(message);
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'Sorry, message not found...' });
	}
};

exports.createMessage = async (req, res) => {
	try {
		// Joi validation result.
		const result = await createMessageSchema.validateAsync(
			req.body
		);
		const { title, description } = result;

		const token = req.cookies.token;
		if (!token)
			return res
				.status(401)
				.json({ message: 'You are not authorized.' });

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		const userId = await jwt_decode(token).user;
		const user = await User.findById(
			mongoose.Types.ObjectId(userId)
		);

		const newMessage = new Message({
			title,
			description,
			author: user,
		});
		await newMessage.save();

		return res.status(201).json({
			message: 'New message created successfully!!!',
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.updateMessage = async (req, res) => {
	try {
		// Joi validation result.
		const result = await updateMessageSchema.validateAsync(
			req.body
		);
		const { title, description } = result;

		const message = await Message.findById(req.params.id);

		if (!message)
			return res.status(404).json({
				message: 'Sorry, message not found...',
			});

		const token = req.cookies.token;
		if (!token)
			return res
				.status(401)
				.json({ message: 'You are not authorized.' });

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		const userId = await jwt_decode(token).user;

		if (message.author[0]._id.toString() === userId) {
			const newMessage = await Message.findByIdAndUpdate(
				req.params.id,
				{
					title,
					description,
				}
			);
	
			await newMessage.save();
			return res
				.status(200)
				.json({ message: 'Message update succeeded!!!' });
			
		} else {
					return res.status(401).json({
						message: 'You are not authorized.',
					});	
		}

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.deleteMessage = async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);

		if (!message)
			return res
				.status(404)
				.json({ message: 'Sorry, message not found' });

		const token = req.cookies.token;
		if (!token)
			return res
				.status(401)
				.json({ message: 'You are not authorized.' });

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		const userId = await jwt_decode(token).user;
		const findUser = await User.findById(userId).select(
			'admin_status'
		);
		const adminStatus = findUser.admin_status;

		if (message.author[0]._id.toString() === userId || adminStatus ===true) {
			await Message.findByIdAndDelete(req.params.id);

			return res
				.status(200)
				.json({
					message: 'Message deleted successfully!!!',
				});
		} else {
			return res.status(401).json({
				message: 'You are not authorized.',
			});
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
