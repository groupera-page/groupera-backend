const jwt = require("jsonwebtoken");
const { Group } = require("../models/Group.model");


// for some reason, bearer is acting weird
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: `${err}` });
    req.user = decoded.id;
    next();
  });
};

const verifyCurrentUser = async (req, res, next) => {
  if (!req) return res.sendStatus(401);
  let group = await Group.findOne({ _id: req.params.groupId });
  if (!group) {
    if (req.params.userId != req.user) return res.sendStatus(401);
    next();
  } else {
    if (req.user != group.moderatorId) return res.sendStatus(401);
    next();
  }
};


module.exports = {
  verifyJWT,
  verifyCurrentUser,
};
