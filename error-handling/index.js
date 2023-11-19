exports.noPathError = (req, res) => {
  // this middleware runs whenever requested page is not available
  res.status(404).json({ message: "Not found" });
};

exports.defaultError = (err, req, res) => {
  // whenever you call next(err), this middleware will handle the error
  // always logs the error
  console.error("Default ERROR", req.method, req.path, err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error. Check the server console",
  });
};
