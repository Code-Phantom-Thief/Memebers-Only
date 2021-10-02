const Joi = require('joi');

exports.registerSchema = Joi.object({
	username: Joi.string().trim().min(2).max(50).required(),
	email: Joi.string()
		.email()
		.trim()
		.min(2)
		.max(100)
		.lowercase()
		.required(),
	password: Joi.string()
		.trim()
		.min(6)
		.max(200)
		.required()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	confirmPassword: Joi.string()
		.trim()
		.min(6)
		.max(200)
        .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	membership_status: Joi.boolean().default(false),
});

exports.loginSchema = Joi.object({
	email: Joi.string()
		.email()
		.trim()
		.min(2)
		.max(100)
		.lowercase()
		.required(),
	password: Joi.string()
		.trim()
		.min(6)
		.max(200)
		.required()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.membershipStatusSchema = Joi.object({
	password: Joi.string()
		.trim()
		.required()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

exports.adminStatusSchema = Joi.object({
	password: Joi.string()
		.trim()
		.required()
});

exports.createMessageSchema = Joi.object({
	title: Joi.string().trim().min(2).max(100).required(),
	description: Joi.string()
		.trim()
		.min(2)
		.max(1000)
		.required(),
});

exports.updateMessageSchema = Joi.object({
	title: Joi.string().trim().min(2).max(100).required(),
	description: Joi.string()
		.trim()
		.min(2)
		.max(1000)
		.required(),
});