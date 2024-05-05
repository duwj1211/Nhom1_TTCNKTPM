const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config")

verifyToken = (req, res, next) => {
  let token = req.cookies?.token;
  if (token) {
    console.log(token);
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token không hợp lệ' }); // Invalid token
      }
      req.user = user;
      next(); // Token hợp lệ, chuyển đến handler tiếp theo
    });
  } else {
    res.status(401).json({ message: 'Phiên đăng nhập hết hạn' });
  }
}

const jwtUtils = {
  verifyToken
};

module.exports = jwtUtils;