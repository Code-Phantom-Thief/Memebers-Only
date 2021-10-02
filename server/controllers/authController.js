const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');

const JWT_ACCESSTOKEN_SECRET =
	process.env.JWT_ACCESSTOKEN_SECRET;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const {
	registerSchema,
	loginSchema,
	membershipStatusSchema,
	adminStatusSchema,
} = require('../middleware/validator');

exports.registerUser = async (req, res) => {
	try {
		// Joi validation result.
		const result = await registerSchema.validateAsync(
			req.body
		);
		const { username, email, password, confirmPassword } =
			result;

		const existUser = await User.findOne({ email });
		if (existUser)
			return res.status(400).json({
				message:
					"You are already this site's member.Please log in.",
			});

		if (password !== confirmPassword)
			return res
				.status(400)
				.json({ message: 'Password does not match.' });

		const newUser = new User({
			username,
			email,
			password,
			confirmPassword,
		});
		await newUser.save();

		const token = jwt.sign(
			{
				user: newUser._id,
			},
			JWT_ACCESSTOKEN_SECRET,
			{ expiresIn: '1h' }
		);

		return res
			.status(201)
			.cookie('token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
			})
			.json({
				message: 'Sign up completed!! Nice to meet you, ',
			});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.loginUser = async (req, res) => {
	try {
		// Joi validation result.
		const result = await loginSchema.validateAsync(
			req.body
		);
		const { email, password } = result;

		const existUser = await User.findOne({ email });

		if (!existUser)
			return res.status(400).json({
				message:
					'Invalid Email or Password. Please try again.',
			});

		const isMatch = await existUser.comparePassword(
			password
		);
		if (!isMatch)
			return res.status(400).json({
				message:
					'Invalid Email or Password. Please try again.',
			});

		const token = await jwt.sign(
			{
				user: existUser._id,
			},
			JWT_ACCESSTOKEN_SECRET,
			{ expiresIn: '1h' }
		);

		return res
			.status(200)
			.cookie('token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
			})
			.json({
				message: 'Login successfully! Welcome back!',
			});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.loggedinUser = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.json(false);

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		return res.json(true);
	} catch (error) {
		return res.json(false);
	}
};

exports.logoutUser = async (req, res) => {
	try {
		res
			.status(200)
			.cookie('token', '', {
				httpOnly: true,
				expires: new Date(0),
				secure: true,
				sameSite: 'none',
			})
			.json({ message: 'Goodbye!' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.membershipStatus = async (req, res) => {
	try {
		// Joi validation result.
		const result =
			await membershipStatusSchema.validateAsync(req.body);
		const { password } = result;

		if (password !== 'jointheclub')
			return res.status(401).json({
				message: 'Please enter "jointheclub"',
			});

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

		user.membership_status = true;
		await user.save();
		res.status(200).json({
			message: "Now, you become this site's member!!!",
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.loggedinMember = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.json(false);

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		const userId = await jwt_decode(token).user;

		const existUser = await User.findById(userId);

		if (existUser.membership_status === true) {
			return res.json(true);
		} else {
			return res.json(false);
		}
	} catch (error) {
		return res.json(false);
	}
};

exports.loggedinAdmin = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.json(false);

		jwt.verify(token, JWT_ACCESSTOKEN_SECRET);

		const userId = await jwt_decode(token).user;

		const existUser = await User.findById(userId);

		if (existUser.admin_status === true) {
			return res.json(true);
		} else {
			return res.json(false);
		}
	} catch (error) {
		return res.json(false);
	}
};

exports.adminStatus = async (req, res) => {
	try {
		// Joi validation result.
		const result = await adminStatusSchema.validateAsync(
			req.body
		);
		const { password } = result;

		if (password !== ADMIN_PASSWORD)
			return res.status(401).json({
				message:
					'Programming advise: You should never expose admin password.',
			});

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

		user.membership_status = true;
		user.admin_status = true;

		await user.save();

		res
			.status(200)
			.json({ message: 'You become this sites Admin!!!' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
