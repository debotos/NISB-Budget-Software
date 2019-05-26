/*
	In Production, also set: (It is a must!!!)
	NODE_ENV: production
*/

module.exports = {
	mongoURI: process.env.MONGO_URI,
	JWTPrivateKey: process.env.JWT_PRIVATE_KEY
}
