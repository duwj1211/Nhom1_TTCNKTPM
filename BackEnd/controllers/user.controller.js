const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateOTP = require('../utils/generateOTP');

const { JWT_SECRET } = require("../config");
const sendMail = require('../utils/sendEmail');

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
const sendResetPasswordOtp = async (req , res ) => {
  try{
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(404).json({message: "Email chưa được đăng ký"});
    }else{
      const {otp, expiryTime} = await generateOTP();
      user.passwordResetOTP = otp,
      user.otpExpiryTime = expiryTime, 

      await user.save();
      const html = `<h1>Xin chào ${user.firstName} ${user.lastName},</h1>
      <p>Đây là email được gửi từ hệ thống bán sách OneBook, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <p>Dưới đây là mã OTP đặt lại mật khẩu của bạn. Ghi nhớ KHÔNG BAO GIỜ chia sẻ mã OTP cho bất kỳ ai khác.</p>
      <p>Mã OTP khôi phục mật khẩu của bạn là: <strong style="color: #006994;font-size: 1.5em">${otp}</strong></p>
      <p>Mã OTP này sẽ có hiệu lực trong vòng <strong>5 phút</strong>. Vui lòng không chậm trễ trong việc sử dụng nó.</p>
      <p>Bỏ qua tin nhắn này nếu người yêu cầu không phải bạn.</p>
      <p>Trân trọng,<br>OneBook</p>`
      await sendMail({email: email, html: html});
      return res.status(200).json({message: "Success"});
    }
  }catch(error){
    return res.status(500).json({message: error.message});
  }
}
const changePasswordForgot = async (req, res) => {
  try {
      const {email, newPassword, otp} = req.body;
      const user = await User.findOne({email: email});
      if(!user){
        return res.status(404).json({message: "Email chưa được đăng ký"});
      }else{
        const otpIsValid = await bcrypt.compare(otp, user.otp);
        const otpExpiryTime = new Date(user.otpExpiryTime);
        if (!otpIsValid || otpExpiryTime < new Date()) {
          return res.status(403).json({message: "Mã OTP không hợp lệ hoặc đã hết hạn"});
        } else {
          user.password = newPassword;
          user.passwordResetOTP = null;
          user.otpExpiryTime = null;
          await user.save();
        }
        return res.status(200).json({user});
      }
  } catch (error) {
    
  }
}

module.exports = {
  getUsers,
  signUp,
  getInfo,
  udpateInfo,
  changePassword,
  sendResetPasswordOtp,
  changePasswordForgot,
};