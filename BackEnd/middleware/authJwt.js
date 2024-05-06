const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config")

verifyToken = async (req, res, next) => {
  const token = await req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Token không hợp lệ' }); // Invalid token
      }
      if (user) {
        req.user = user;
      }
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