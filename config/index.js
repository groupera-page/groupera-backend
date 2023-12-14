// We reuse this import in order to have access to the `body` property in requests
const express = require('express')

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require('morgan')

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require('cookie-parser')

// ℹ️ Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require('cors')

// Middleware configuration
module.exports = (app) => {
	// Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
	// Services like Fly use something called a proxy and you need to add this to your server
	if (['staging', 'production'].includes(process.env.NODE_ENV)) {
		app.set('trust proxy', 1);
	}

	// controls a very specific header to pass headers from the frontend
	const corsConfig = {
		origin: ['http://localhost:8080', process.env.FRONTEND_BASE_URL],
		credentials: true,
	}

	app.use(cors(corsConfig))


	app.options('*', cors(corsConfig))

	// app.use((req, res, next) => {
	// 	res.header(
	// 		'Access-Control-Allow-Headers',
	// 		'x-access-token, Origin, Content-Type, Accept, Authorization'
	// 	);
	// 	next();
	// });

	// In development environment the app logs
	app.use(logger('dev'))

	// To have access to `body` property in the request
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())
}
