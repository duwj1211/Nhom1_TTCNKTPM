import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SignIn.module.css';

const cx = classNames.bind(styles);

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRecoverForm, setShowRecoverForm] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Xử lý đăng nhập
    };

    const handleRecoverPassword = (e) => {
        e.preventDefault();
        // Xử lý khôi phục mật khẩu
    };

    const showRecoverPasswordForm = () => {
        setShowRecoverForm(true);
    };

    const hideRecoverPasswordForm = () => {
        setShowRecoverForm(false);
    };

    return (
        <div className={cx('row')}>
            <div className={cx('col-lg-10', 'offset-lg-1', 'col-xl-8', 'offset-xl-2')}>
                <div className={cx('d-group')}>
                    <div className={cx('left-col')}>
                        <div className={cx('group-login', 'group-log')}>
                            <h1 className={cx('title-block-page')}>Đăng nhập tài khoản</h1>
                            <form onSubmit={handleLogin} id="customer_login" acceptCharset="UTF-8">
                                <input type="hidden" name="FormType" value="customer_login" />
                                <input type="hidden" name="utf8" value="true" />
                                <p className={cx('error')}></p>
                                <fieldset className={cx('form-group')}>
                                    <label>Email <span className={cx('required')}>*</span></label>
                                    <input type="email" pattern="^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*{2,63}$" className={cx('form-control', 'form-control-lg')} value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="customer_email" placeholder="Email" required />
                                </fieldset>
                                <fieldset className={cx('form-group')}>
                                    <label>Mật khẩu <span className={cx('required')}>*</span> </label>
                                    <input type="password" className={cx('form-control', 'form-control-lg')} value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="customer_password" placeholder="Mật khẩu" required />
                                </fieldset>
                                <button className={cx('btn-login')} type="submit">Đăng nhập</button>
                            </form>
                            <div className={cx('block', 'social-login--facebooks')}>
                                <p className={cx('a-center')}>
                                    <span>Hoặc đăng nhập bằng</span>
                                </p>
                                <a href="#" className={cx('social-login--facebook')}><img width="129px" height="37px" alt="facebook-login-button" src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" /></a>
                                <a href="#" className={cx('social-login--google')}><img width="129px" height="37px" alt="google-login-button" src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" /></a>
                            </div>
                            <p>
                                Bạn quên mật khẩu bấm <button onClick={showRecoverPasswordForm}>vào đây</button>
                            </p>
                        </div>
                        {showRecoverForm && (
                            <div className={cx('group-login', 'group-recover')}>
                                <h2>Quên mật khẩu</h2>
                                <p className={cx('description')}>
                                    Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.
                                </p>
                                <form onSubmit={handleRecoverPassword} id="recover_customer_password" acceptCharset="UTF-8">
                                    <input type="hidden" name="FormType" value="recover_customer_password" />
                                    <input type="hidden" name="utf8" value="true" />
                                    <p className={cx('error')}></p>
                                    <fieldset className={cx('form-group')}>
                                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" className={cx('form-control', 'form-control-lg')} value={recoverEmail} onChange={(e) => setRecoverEmail(e.target.value)} name="Email" id="recover-email" placeholder="Email" required />
                                    </fieldset>
                                    <input className={cx('btn-login')} type="submit" value="Gửi yêu cầu" />
                                    <button className={cx('btn-ref')} onClick={hideRecoverPasswordForm}>Hủy</button>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className={cx('right-col')}>
                        <h4>
                            Quyền lợi với thành viên
                        </h4>
                        <div>
                            <p>Vận chuyển siêu tốc</p>
                            <p>Sản phẩm đa dạng</p>
                            <p>Đổi trả dễ dàng</p>
                            <p>Tích điểm đổi quà</p>
                            <p>Được giảm giá cho lần mua tiếp theo lên đến 10%</p>
                        </div>
                        <a href="#" className={cx('btn-register-default')}>Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
