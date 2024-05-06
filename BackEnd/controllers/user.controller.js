const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { JWT_SECRET } = require("../config")

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
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

const getInfo = async (req, res) => {
  try {
    if (req.user.userId) {
      const userInfo = await User.findOne({_id: req.user.userId})
      return res.status(200).json({userInfo});
    } else {
      return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const udpateInfo = async (req, res) => {
  try {
    if (req.user.userId) {
      const newInfo = req.body.newInfo;
      const userInfo = await User.findOneAndUpdate({_id: req.user.userId}, {
        $set: {...newInfo}
      }, {new: true})
      return res.status(200).json({userInfo});
    } else {
      return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const changePassword = async (req, res) => {
  try {
    if (req.user.userId) {
      const {currentPassword, newPassword} = req.body;
      const userInfo = await User.findOne({_id: req.user.userId});
      const passwordIsValid = await bcrypt.compare(currentPassword, userInfo.password)
      console.log(passwordIsValid);
      if (!passwordIsValid) {
        return res.status(403).json({message: "Mật khẩu không chính xác"})
      } else {
        userInfo.password = newPassword;
        await userInfo.save();
      }
      console.log(userInfo);
      return res.status(200).json({userInfo});
    } else {
      return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
    }
  } catch (error) {
    
  }
}

module.exports = {
  getUsers,
  signUp,
  getInfo,
  udpateInfo,
  changePassword
};