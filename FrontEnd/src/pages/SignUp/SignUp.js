import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.signup}>
            <img className={styles.icon} alt="" src="/440918--1@2x.png" />
            <div className={styles.frameParent}>
                <div className={styles.firstNameWrapper}>
                    <b className={styles.firstName}>First Name</b>
                    <input
                        type="text"
                        className={styles.inputField1}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className={styles.lastNameWrapper}>
                    <b className={styles.lastName}>Last Name</b>
                    <input
                        type="text"
                        className={styles.inputField2}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className={styles.emailWrapper}>
                    <b className={styles.email}>Email</b>
                    <input
                        type="email"
                        className={styles.inputField3}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.passwordWrapper}>
                    <b className={styles.password}>Password</b>
                    <input
                        type="password"
                        className={styles.inputField4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img className={styles.hideIcon} alt="" src="/hide.svg" />
                </div>
                <div className={styles.createAccountWrapper}>
                    <b className={styles.createAccount}>
                        Create Account
                    </b>
                </div>
                <div className={styles.or}>or</div>
                <div className={styles.passwordConditions}>
                    <div className={styles.passwordDisplay}>
                        <img className={styles.crossIcon} alt="" src="/cross.svg" />
                        <p>Password strength</p>
                    </div>
                    <div className={styles.passwordDisplay}>
                        <img className={styles.crossIcon1} alt="" src="/cross.svg" />
                        <p>At least 10 characters</p>
                    </div>
                </div>
                <img className={styles.homeIcon} alt="" src="/home.svg" />
                <img className={styles.frameChild} alt="" src="/vector-2.svg" />
                <img className={styles.frameItem} alt="" src="/vector-2.svg" />
                <b className={styles.createAccount2}>Create Account</b>
                <div className={styles.SgnUpFB}>
                    <b className={styles.signUpWithContainer}>
                        <p className={styles.signUpWith}>Sign up with Facebook</p>
                    </b>
                    <div className={styles.socialMediaFacebook}>
                        <div className={styles.logoContainer} />
                        <img className={styles.capa2Icon} alt="" src="/capa-2.svg" />
                    </div>
                </div>
                <div className={styles.SgnUpGG}>
                    <b className={styles.signUpWithContainer}>
                        <p className={styles.signUpWith}>Sign up with Google</p>
                    </b>
                    <img className={styles.techLogosGoogle} alt="" src="/tech-logos--google.svg" />
                </div>
                <div className={styles.alreadyHaveAn}>
                    <NavLink to='/SignIn' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Already have an account? Login</span></NavLink>
                </div>
            </div>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />

            {/* <div className={styles.discoverYourNext}>
                Discover your next must read author.
            </div> */}
        </div>
    );
};

export default SignUp;