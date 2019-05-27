const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
	{
		voucher: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 100,
			trim: true
		},
		date: {
			type: Number, // store timestamp
			required: true,
			index: true,
			trim: true
		},
		da: {
			type: Number,
			required: true,
			trim: true
		},
		ta: {
			type: Number,
			required: true,
			trim: true
		},
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 100,
			trim: true
		},
		designation: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 100,
			trim: true
		},
		amount: {
			type: Number,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = Travel = mongoose.model('Travel', Schema)
