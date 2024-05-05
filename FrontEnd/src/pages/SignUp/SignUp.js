import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import ApiService from '../../service/api.service';

const cx = classNames.bind(styles);
const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await ApiService.post("users/register", {
                firstName,
                lastName,
                email,
                password
            })
            if (res.status === 200) {
                setShowDialog(true)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg(error.response.data.message)
            }
            console.log(error);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <img className={cx('image-holder')} src="https://colorlib.com/etc/regform/colorlib-regform-17/images/registration-form-1.jpg" alt="" />
                <form>
                    <h3>Đăng ký ngay</h3>
                    <div className={cx("form-wrapper")}>
                        <input type="text" placeholder="Họ" className={cx("form-control")} 
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    <div className={cx("form-wrapper")}>
                        <input type="text" placeholder="Tên" className={cx("form-control")} 
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <div className={cx("form-wrapper")}>
                        <input type="text" placeholder="Email" className={cx("form-control")} 
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={cx("form-wrapper")}>
                        <input type="password" placeholder="Mật khẩu" className={cx("form-control")} 
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className={cx('err-message')}>
                        { !!errorMsg && errorMsg}
                    </div>
                    <button onClick={handleSubmit}>
                        Đăng ký
                        <i className="far fa-arrow-right"></i>
                    </button>
                    <div className={cx("link-register")}>
                        Bạn đã có tài khoản? 
                        <Link to="/login"> Đăng nhập</Link>
                    </div>
                </form>
            </div>
            <div id="dialog" className={cx('dialog', { open: showDialog })}>
                <div className={cx('success')}>
                    Tạo mới tài khoản thành công! <br/>
                    <Link to='/login'>Đăng nhập ngay</Link>
                </div>
                <button onClick={() => setShowDialog(false)} aria-label="close" className={cx('close')}>❌</button>
            </div>
            <div className={cx('overlay')}></div>
        </div>
    );
};

export default SignUp;