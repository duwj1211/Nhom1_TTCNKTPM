import styles from "./SignIn.module.css";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import { useState } from "react";
import ApiService from '../../service/api.service';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cx = classNames.bind(styles);
const SignIn = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const response = await ApiService.post("auth/login", {
                email: email,
                password: password
            })
            if (response.status === 200) {
                cookies.set("token", response.data.token, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });
                localStorage.setItem("userInfo", JSON.stringify(response.data.user))
                localStorage.setItem("token", JSON.stringify(response.data.token))
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                setErrorMsg(err.response.data.message)
            }
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <img className={cx('image-holder')} src="https://colorlib.com/etc/regform/colorlib-regform-17/images/registration-form-1.jpg" alt="" />
                <form>
                    <h3>Đăng nhập</h3>
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
                    <div className={cx("forgoet-password")}>
                        <Link to="/reset-password">Quên mật khẩu</Link>
                    </div>
                    <button onClick={handleSubmit}>
                        Đăng nhập
                        <i className="far fa-arrow-right"></i>
                    </button>
                    <div className={cx("link-register")}>
                        Bạn chưa có tài khoản? 
                        <Link to="/signup"> Đăng ký ngay</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
