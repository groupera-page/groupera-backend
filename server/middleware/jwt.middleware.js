// const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const { User } = require('../models/User.model')
const { Group } = require('../models/Group.model')


// // Instantiate the JWT token validation middleware
// const isAuthenticated = expressjwt({
//   secret: process.env.TOKEN_SECRET,
//   algorithms: ["HS256"],
//   getToken: getTokenFromHeaders,
// });

// // Function used to extract the JWT token from the request's 'Authorization' Headers
// function getTokenFromHeaders(req) {
//   // Check if the token is available on the request Headers
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "Bearer"
//   ) {
//     // Get the encoded token string and return it
//     const token = req.headers.authorization.split(" ")[1];
//     return token;
//   }

//   return null;
// }

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
          if(err) return res.sendStatus(403);
          req.user = decoded.UserInfo.id;
          req.roles = decoded.UserInfo.roles
          next();
      }
  )
};

const verifyRoles = (...allowedRoles) => {
  return async (req, res, next) => {
      if(!req?.roles) return res.sendStatus(401); // unauthorized
      const rolesArray = [...allowedRoles];
      console.log(req.user)
      console.log(rolesArray);
      console.log(req.roles);
      const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
      let group = await Group.findOne({_id: req.params.groupId})
      if(group){
        if(result || req.params.id == req.user || req.user == group.moderator)
        next(); 
      } else if (!group) {
        if(result || req.params.id == req.user){
        next();
        } else {
          return res.sendStatus(401);
        }
      }
      else return res.sendStatus(401);
  }
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  // isAuthenticated,
  verifyJWT,
  verifyRoles
};
