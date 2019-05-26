const salaries = require('../routes/salaries')
const error = require('../middleware/error')

const version = process.env.API_VERSION || 'v1'

module.exports = function(app) {
	app.use(`/api/${version}/salaries`, salaries)
	app.use(error)
}
