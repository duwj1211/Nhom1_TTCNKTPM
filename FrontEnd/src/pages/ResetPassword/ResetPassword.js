import styles from "./ResetPassword.module.css";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import {useEffect ,useState } from "react";
import ApiService from '../../service/api.service';
import { Tooltip } from 'react-tooltip'
//import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ResetPassword = () => {
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassWord] = useState("");
    const [confirmNewPassword, setConfirmNewPassWord] = useState("");
    const [otp, setOtp] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [sendOTPSuccess, setSendOTPSuccess] = useState("");
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };
    const handleNewPasswordChange = (e) => {
        setNewPassWord(e.target.value);
        setNewPasswordError("");
    };
    const handleConfirmNewPassWordChange = (e) => {
        setConfirmNewPassWord(e.target.value);
        setConfirmNewPasswordError("");
    }
    useEffect(() => {
        handlePassWordMatch();
    }, [newPassword, confirmNewPassword]);
    const handlePassWordMatch = (e) => {
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("Mật khẩu không trùng khớp!");
        }
    }
    const handleOTPChange = (e) => {
        setOtp(e.target.value);
        setOtpError("");
    }
    const isValidForm = () => {
        let isValid = true;
        if (!email) {
            setEmailError("Email không được trống");
            isValid = false;
        }
        if (!newPassword) {
            setNewPasswordError("Mật khẩu mới không được trống");
            isValid = false;
        }
        if (!confirmNewPassword) {
            setConfirmNewPasswordError("Nhập lại mật khẩu mới không được trống");
            isValid = false;
        }
        if (!otp) {
            setOtpError("OTP không được trống");
            isValid = false;
        }
        return isValid;
    }
    useEffect(() => {
        let intervalId;
        if (timerRunning) {
          intervalId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);
        } else {
          clearInterval(intervalId);
        }
    
        return () => clearInterval(intervalId);
      }, [timerRunning]);
    useEffect(() => {
        if (timeRemaining === 0) {
            setButtonDisabled(false);
            setTimerRunning(false);
            setTimeRemaining(60); 
        }
    }, [timeRemaining]);
    const handleSendOTP = async(e) => {
        e.preventDefault();
        setTimerRunning(true);
        setButtonDisabled(true);
        try{
            const response = await ApiService.post('users/send-reset-password-otp', {
                email: email,
            });
            if(response.status === 200){
                setSendOTPSuccess('Đã gửi mã xác nhận về Email');
            }else if(response.status === 404){
                setEmailError('Email chưa được đăng ký');
            }else{
                console.log('unsuccess');
            }
        }catch(error){
            console.error(error);
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isValidForm()){
            try{
                const response = await ApiService.post('users/reset-password',{
                    email: email,
                    newPassword: newPassword,
                    otp: otp, 
                });
                if(response.status === 200){
                    setShowDialog(true);
                }else if(response.status === 404){
                    setEmailError('Email chưa được đăng ký');
                }else if(response.status === 403){
                    setOtpError('OTP không hợp lệ hoặc đã hết hạn');
                }else{
                    console.log(response);
                }
            }catch(error){
                console.error(error);
            }
        }
    }
    
    return(
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <img className={cx('image-holder')} src={require("../../assets/images/banner-login.jpg")} alt="" />
                <form>
                    <h3>Đặt lại mật khẩu</h3>
                    <h6>
                        Sau khi nhập email và mật khẩu mới, nhấn "Gửi". Mã xác nhận sẽ được gửi tới Email của bạn, nhập mã vào ô OTP
                        sau đó nhấn "Cập nhật".
                    </h6>
                    <div className={cx("form-wrapper")}>
                        <input type="text" placeholder="Email" className={cx("form-control")}  data-tip={emailError} data-for={"emailTooltip"} 
                            onChange={handleEmailChange}
                        />
                        <p>{emailError}</p>
                    </div>
                    <div className={cx("form-wrapper")}>
                        <input type="password" placeholder="Mật khẩu mới" className={cx("form-control")} 
                            onChange={handleNewPasswordChange}
                        />
                        <p>{newPasswordError}</p>
                    </div>
                    <div className={cx("form-wrapper")}>
                        <input type="password" placeholder="Nhập lại mật khẩu mới" className={cx("form-control")} 
                            onChange={handleConfirmNewPassWordChange}
                        />
                        <p>{confirmNewPasswordError}</p>
                    </div>
                    <div className={cx("form-wrapper")}>
                        <div className={cx("send-otp-wrapper")}>
                            <div>
                                <input type="text" placeholder="OTP" className={cx("form-control")} 
                                    onChange={handleOTPChange}
                                />
                                <p>{otpError}</p>
                                <p className={cx("send-otp-success")}>{sendOTPSuccess}</p>
                            </div> 
                            <div>
                                <button type="button" onClick={handleSendOTP} className={`btn ${buttonDisabled ? 'btn-secondary disabled' : 'btn-primary'}`}  disabled={buttonDisabled}>Gửi({timeRemaining})</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className={cx('err-message')}>
                        {}
                    </div>
                    <button onClick={handleSubmit}>
                        Cập nhật
                        <i className="far fa-arrow-right"></i>
                    </button>
                    <div className={cx("link-register")}>
                        Quay lại 
                        <Link to="/login"> Đăng nhập</Link>
                    </div>
                </form>
            </div>
            <div id="dialog" className={cx('dialog', { open: showDialog })}>
                <div className={cx('success')}>
                    Cập nhật mật khẩu thành công! <br/>
                    <Link to='/login'>Đăng nhập ngay</Link>
                </div>
                <button onClick={() => setShowDialog(false)} aria-label="close" className={cx('close')}>❌</button>
            </div>
            <div className={cx('overlay')}></div>
        </div>
    )
}

export default ResetPassword;