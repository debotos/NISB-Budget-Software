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

		others: { type: Array, default: [] },

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

module.exports = Other = mongoose.model('Other', Schema)