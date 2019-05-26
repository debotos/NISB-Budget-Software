const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 100,
			trim: true
		},
		email: {
			type: String,
			required: true,
			minlength: 3,
			trim: true
		},
		message: {
			type: String,
			required: true,
			minlength: 3,
			trim: true
		},
		haveAccount: {
			type: Boolean,
			default: false,
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = Salary = mongoose.model('Salary', Schema)
