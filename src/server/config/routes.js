const salaries = require('../routes/salaries')
const fringes = require('../routes/fringes')
const consultant = require('../routes/consultant')
const error = require('../middleware/error')

const version = process.env.API_VERSION || 'v1'

module.exports = function(app) {
	app.use(`/api/${version}/salaries`, salaries)
	app.use(`/api/${version}/fringes`, fringes)
	app.use(`/api/${version}/consultant`, consultant)
	app.use(error)
}
