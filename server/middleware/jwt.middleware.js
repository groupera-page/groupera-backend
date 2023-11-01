const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const { User } = require('../models/User.model')

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
          if(err) return res.sendStatus(403);
          req.user = decoded.username;
          next();
      }
  )
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  verifyJWT
};
