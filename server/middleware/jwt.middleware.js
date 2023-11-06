const jwt = require("jsonwebtoken");
const { Group } = require('../models/Group.model')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader)
  if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
          if(err) return res.status(403).send({message: `${err}`});
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

module.exports = {
  verifyJWT,
  verifyRoles
};
