const error = require('../middleware/error')

const version = process.env.API_VERSION || 'v1'

module.exports = function(app) {
	// app.use(`/api/${version}/consumers`, consumers)
	app.use(error)
}
