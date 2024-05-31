import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import facebook from '../../../assets/images/img_facebook_logo.png';
import linkedin from '../../../assets/images/img_linkedin_logo.png';
import twitter from '../../../assets/images/img_twitter_logo.png';
import youtube from '../../../assets/images/img_youtube_logo.png';
import thumb1 from '../../../assets/images/img_rectangle_22_100x100.png';
import thumb2 from '../../../assets/images/img_rectangle_22.png';

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <footer className={cx('wrapper')}>
            <section className={cx('index-module_grid', 'index-module_wide')}>
                <section className='row'>
                    <section className='col-lg-4 col-md-12'>  
                        <Link to='/' className={cx('logo')}>
                            <span className={cx('highlight')}>One</span>book
                        </Link>
                        <p>Thương hiệu sách cung cấp các thể loại đa dạng cho độc giả.</p>
                        <section className='row'>
                                <div className={cx('social-list')}>
                                    <Link to={'/'} className={cx('social-item')} title='1Book trên Facebook' target='_blank' rel='noreferrer'>
                                        <img className={cx('social-logo')} src={facebook} alt="facebook logo"/>
                                    </Link>
                                    <Link to={'/'} className={cx('social-item')} title='1Book trên Linkedin' target='_blank' rel='noreferrer'>
                                        <img className={cx('social-logo')} src={linkedin} alt="linkedin logo"/>
                                    </Link>
                                    <Link to={'/'} className={cx('social-item')} title='1Book trên Twitter' target='_blank' rel='noreferrer'>
                                        <img className={cx('social-logo')} src={twitter} alt="twitter logo"/>
                                    </Link>
                                    <Link to={'/'} className={cx('social-item')} title='1Book trên Youtube' target='_blank' rel='noreferrer'>
                                        <img className={cx('social-logo')} src={youtube} alt="youtube logo"/>
                                    </Link>  
                                </div>
                        </section>
                    </section>
                    <section className='col-lg-3 col-md-12'>
                        <div className={cx('column')}>
                            <div>
                                <h3 className={cx('heading')}>Khám phá</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('list-items')}>
                                        <Link to={'/'}>Trang chủ</Link>    
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/books'}>Sách</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/authors'}>Tác giả</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className='col-lg-5 col-md-12'>
                    <div className={cx('column')}>
                            <div>
                                <h3 className={cx('heading')}>Chính sách</h3>
                                <ul className={cx('news-list')}>
                                    <li>Chính sách và giao nhận thanh toán</li>
                                    <li>Chính sách bảo mật thông tin cá nhân</li>
                                    <li>Chính sách đổi trà sản phẩm</li>
                                    <li>Chính sách và quy định chung</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
                <section className={cx('row')}>
                    <section className='col-lg-12'>
                        <div className={cx('bottom')}>
                            <div className={cx('copyright')}>
                                © 2024 Onebook. All Rights Reserved.
                            </div>
                        </div>
                        <div className={cx()}>

                        </div>
                    </section>
                </section>
            </section>
        </footer>
     );
}

export default Footer;