const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

const signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: "Không có email hoặc mật khẩu",
    })
  }
  try {
    const user = await User.findOne({email});
    if (!user) {
      res.status(400).json({message: 'Email chưa được đăng ký'})
    } else {
      const passwordIsValid = await bcrypt.compare(password, user.password)
      if (!passwordIsValid) {
        return res.status(400).json({message: "Email hoặc mật khẩu không chính xác"})
      }
      const token = jwt.sign(
        {userId: user._id, email: user.email},
        JWT_SECRET,
        { expiresIn: '7d' } //7 ngay
      )
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24 * 7
      })
      res.setHeader("Authorization", token)
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp
};