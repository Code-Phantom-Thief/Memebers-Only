const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash, compare } = require('bcrypt');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 50,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 200,
		},
		confirmPassword: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 200,
		},
		membership_status: {
			type: Boolean,
			default: false,
		},
		admin_status: {
			type: Boolean,
			default: false,
		},
		messagea: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
		}
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			next();
		}
		if (!this.isModified('confirmPassword')) {
			next();
		}
		this.password = await hash(this.password, 12);
		this.confirmPassword = await hash(
			this.confirmPassword,
			12
		);
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.comparePassword = async function (
	password
) {
	try {
		return await compare(password, this.password);
	} catch (error) {
		throw new Error();
	}
};

module.exports = mongoose.model('User', UserSchema);
