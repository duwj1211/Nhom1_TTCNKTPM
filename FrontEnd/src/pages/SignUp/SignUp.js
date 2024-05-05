import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleSubmit = () => {
        
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
        </div>
    );
};

export default SignUp;