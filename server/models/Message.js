const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        author:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim:true
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 1000
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);