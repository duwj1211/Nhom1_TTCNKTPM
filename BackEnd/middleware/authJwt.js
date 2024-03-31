const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config")

verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    
  }
}