module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    // console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    // if (!res.headersSent) {
    res.status(err.status || 500).json({
      message: err.message || "Internal server error. Check the server console",
    });
    // }
  });
};

module.exports.myCustomError = (message, statusCode=500, options={}) => {
  const error = new Error(message)
  error.status = statusCode
  if (options.cause) error.cause = options.cause
  if (options.name) error.name = options.name
  if (options.stack) error.stack = options.stack
  return error
}