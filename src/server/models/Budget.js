const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
	{
		consultant: {
			type: Number,
			required: true,
			trim: true
		},
		fringe: {
			type: Number,
			required: true,
			trim: true
		},
		other: {
			type: Number,
			required: true,
			trim: true
		},
		salary: {
			type: Number,
			required: true,
			trim: true
		},
		supply: {
			type: Number,
			required: true,
			trim: true
		},
		travel: {
			type: Number,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = Budget = mongoose.model('Budget', Schema)
