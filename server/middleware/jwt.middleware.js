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
          req.user = decoded.id;
          next();
      }
  )
};

const verifyCurrentUser = async (req, res, next) => {
      if(!req) return res.sendStatus(401); // unauthorized
      let group = await Group.findOne({_id: req.params.groupId})
      if(group){
        if(req.params.userId == req.user || req.user == group.moderatorId)
        next(); 
      } else if (!group) {
        if(req.params.userId == req.user){
        next();
        } else {
          return res.sendStatus(401);
        }
      }
      else return res.sendStatus(401);
  };

module.exports = {
  verifyJWT,
  verifyCurrentUser
};
