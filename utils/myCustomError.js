module.exports = (message, statusCode = 500, options = {}) => {
	const error = new Error(message)
	error.status = statusCode
	if (options.cause) error.cause = options.cause
	if (options.name) error.name = options.name
	if (options.stack) error.stack = options.stack
	return error
}
