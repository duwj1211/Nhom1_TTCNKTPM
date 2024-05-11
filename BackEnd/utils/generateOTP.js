const otpGenerator = require('otp-generator');

const generateOTP = async () => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: true,
        specialChars: false,
    });
    return { otp: otp, expiryTime: new Date(Date.now() + 5 * 60 * 1000) }; // Thời gian hiệu lực là 5 phút từ thời điểm hiện tại
};

module.exports = generateOTP;