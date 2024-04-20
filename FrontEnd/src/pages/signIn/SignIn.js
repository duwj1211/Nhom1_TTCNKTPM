import styles from "./SignIn.module.css";
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import React, { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        // Xử lý yêu cầu đăng nhập tại đây
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return (
        <div className={styles.signin}>
            <img className={styles.icon} alt="" src="/440918--1@2x.png" />
            <div className={styles.inputFieldParent}>
                <div className={styles.inputField}>
                    <b className={styles.signInWithContainer}>
                        <p className={styles.signInWith}>Sign in with Facebook</p>
                    </b>
                    <div className={styles.socialMediaFacebook}>
                        <div className={styles.logoContainer} />
                        <img className={styles.capa2Icon} alt="" src="/capa-2.svg" />
                    </div>
                </div>
                <div className={styles.inputField1}>
                    <b className={styles.signInWithContainer}>Sign in with Google</b>
                    <img
                        className={styles.techLogosGoogle}
                        alt=""
                        src="/tech-logos--google.svg"
                    />
                </div>
                <div className={styles.emailWrapper}>
                    <b className={styles.email}>Email</b>
                    <input
                        type="email"
                        className={styles.inputField2}
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={styles.passwordWrapper}>
                    <b className={styles.password}>Password</b>
                    <input
                        type="password"
                        className={styles.inputField3}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <img className={styles.hideIcon} alt="" src="/hide.svg" />
                </div>
                <button onClick={handleSubmit} className={styles.signinAccountWrapper}>Sign In</button>
                <div className={styles.or}>or</div>
                <img className={styles.crossIcon} alt="" src="/cross.svg" />
                <img className={styles.crossIcon1} alt="" src="/cross.svg" />
                <div className={styles.passwordStrengthAtContainer}>
                    <p className={styles.signInWith}>Password strength</p>
                    <p className={styles.signInWith}>At least 10 characters</p>
                </div>
                <img className={styles.homeIcon} alt="" src="/home.svg" />
                <img className={styles.frameChild} alt="" src="/vector-2.svg" />
                <img className={styles.frameItem} alt="" src="/vector-2.svg" />
                <b className={styles.signinAccount2}>SignIn Account</b>
                <div className={styles.alreadyHaveAn}>
                    <NavLink to='/SignUp' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Sign up</span></NavLink>
                </div>
            </div>

            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <div className={styles.discoverYourNext}>
                Discover your next must read author.
            </div>
        </div>
    );
};

export default SignIn;
