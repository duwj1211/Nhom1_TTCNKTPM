import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <footer className={cx('footer')}>
            <div className={cx('social-marketting')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-4 col-12')}>
                            <div className={cx('social')}>
                                <a href='https://www.facebook.com/nhanampublishing' className={cx('social-btn')} title='Facebook' target='_blank' rel='nofollow'>
                                    <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/facebook-icon.png?1704690471681" alt="Facebook" />
                                </a>
                                <a href={'https://www.instagram.com/'} className={cx('social-btn')} title='Instagram' target='_blank' rel='nofollow'>
                                    <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/instagram-icon.png?1704690471681" alt="Instagram" />
                                </a>
                                <a href="https://www.lazada.vn/shop/nha-nam-tphcm1632821525/" class="social-button" title="Lazada" target="_blank" rel="nofollow">
                                <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/lazada-icon.png?1704690471681" alt="Lazada" />
                                </a>
                                <a href="https://shopee.vn/nhanam59" class="social-button" title="Shopee" target="_blank" rel="nofollow">
                                    <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/shopee-icon.png?1704690471681" alt="Shopee" />
                                </a>
                                <a href="https://www.tiktok.com/@nhanamhanoi" class="social-button" title="Tiktok" target="_blank" rel="nofollow">
                                    <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/tiktok-icon.png?1704690471681" alt="Tiktok" />
                                </a>
                            </div>
                        </div>
                        <div className={cx('col-lg-8', 'col-12')}>
                            <div className={cx('email-mkt')}>
                                <h4>Nhận thông tin khuyến mãi từ chúng tôi</h4>
                                <div className={cx('mail-chipm')}>
                                    <form action="#" className={cx('newsletter-form')}>
                                        <input className={cx('form-control')} type="email" aria-label='Nhập thông tin email' placeholder='Nhận email ưu đãi' name='EMAIL' required autocomplete='off'/>
                                        <button className={cx('button-sub')} type='submit' aria-label='Đăng ký nhận thông tin ưu đãi' name='subscribe'>Đăng ký</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('first-footer', 'd-flex')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3', 'first-col')}>
                            <a href='#' className={cx('logo')}>
                                <img width="64" height="62" src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/logo.png?1704690471681" alt="Nhã Nam" />
                                <span>Bởi vì sách là thế giới</span>
                            </a>
                            <ul className={cx('list-menu')}>
                                <li className={cx('menu-items')}>
                                    <div className={cx('icon')}>
                                        <i className={cx('far', 'fa-map-marker-alt')}></i>
                                    </div>
                                    <p>Số 59, Đỗ Quang, Trung Hoà, Cầu Giấy, Hà Nội.</p>
                                </li>
                                <li className={cx('menu-items')}>
                                    <div className={cx('icon')}>
                                        <i className={cx('far', 'fa-envelope')}></i>
                                    </div>
                                    <a href='mailto:info@nhanam.vn'>info@nhanam.vn</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <div className={cx('icon')}>
                                        <i className={cx('fas', 'fa-phone-alt')}></i>
                                    </div>
                                    <a class='phone' href='tel:02435146876'>02435146876</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <div className={cx('icon')}>
                                        <i class={cx('fas', 'fa-mobile-alt')}></i>
                                    </div>
                                    <a class='phone' href='tel:0903244248'>0903244248</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col-lg-3')}>
                            <h4 className={cx('title-menu')}>
                                <span>Giới thiệu</span>
                            </h4>
                            <ul className={cx('list-menu')}>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Về Nhã Nam">Về Nhã Nam</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Hệ thống hiệu sách">Hệ thống hiệu sách</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Hệ thống phát hành">Hệ thống phát hành</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Tuyển dụng">Tuyển dụng</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Liên hệ với chúng tôi">Liên hệ với chúng tôi</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col-lg-3')}>
                            <h4 className={cx('title-menu')}>
                                <span>Chính sách</span>
                            </h4>
                            <ul className={cx('list-menu')}>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Chính sách bảo mật">Chính sách bảo mật</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Chính sách đổi trả/hoàn tiền">Chính sách đổi trả/hoàn tiền</a>
                                </li>
                                <li className={cx('menu-items')}>
                                    <a href="#" title="Chính sách thanh toán/ vận chuyển">Chính sách thanh toán/ vận chuyển</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col-lg-3')}>
                            <h4 className={cx('title-menu')}>
                                <span>Phương thức thanh toán</span>
                            </h4>
                            <div class="payment">
						        <img src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/payment_method.png?1704690471681" class="lazyload loaded" alt="Phương thức thanh toán" />
					        </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" className={cx('backtop', 'show')} title="Lên đầu trang">
                <i className={cx('fa', 'fa-angle-up')} aria-hidden="true"></i>
            </a>
        </footer>
     );
}

export default Footer;