const User = require('../models/user.model');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    console.log(user);
    if (user) {
      return res.status(400).json({message: "Email đã được đăng ký!"})
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;