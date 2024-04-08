import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <footer className={cx('wrapper')}>
            <section className={cx('index-module_grid', 'index-module_wide')}>
                <section className={cx('index-module_row')}>
                    <section className={cx('index-module_col', 'index-module_l-4')}>
                        <img className={cx('top-logo')} src="./images/img_logo_1.png" alt="image logo"/>
                        <p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <section className={cx('index-module_row', 'social-list')}>
                                <a href="#" className={cx('social-item')} title='1Book trên Facebook' target='_blank' rel='noreferrer'>
                                    <img className={cx('social-logo')} src="./images/img_facebook_logo.png" alt="facebook logo"/>
                                </a>
                                <a href="#" className={cx('social-item')} title='1Book trên Linkedin' target='_blank' rel='noreferrer'>
                                    <img className={cx('social-logo')} src="./images/img_linkedin_logo.png" alt="linkedin logo"/>
                                </a>
                                <a href="#" className={cx('social-item')} title='1Book trên Twitter' target='_blank' rel='noreferrer'>
                                    <img className={cx('social-logo')} src="./images/img_twitter_logo.png" alt="twitter logo"/>
                                </a>
                                <a href="#" className={cx('social-item')} title='1Book trên Youtube' target='_blank' rel='noreferrer'>
                                    <img className={cx('social-logo')} src="./images/img_youtube_logo.png" alt="youtube logo"/>
                                </a>  
                        </section>
                    </section>
                    <section className={cx('index-module_col', 'index-module_l-3')}>
                        <div className={cx('column')}>
                            <div>
                                <h3 className={cx('heading')}>Company</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('list-items')}>
                                        <a href="#">Home</a>    
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">About us</a>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">Books</a>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">Ebooks</a>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">New release</a>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">Contact us</a>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <a href="#">Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className={cx('index-module_col', 'index-module_l-5')}>
                    <div className={cx('column')}>
                            <div>
                                <h3 className={cx('heading')}>Lastest news</h3>
                                <ul className={cx('news-list')}>
                                    <li className={cx('news-items')}>   
                                        <a href="#" target='_self' className={cx('link')}>
                                            <img className={cx('news-thumb')} src="./images/img_rectangle_22.png" alt="image" />
                                        </a>
                                        <div className={cx('news-container')}>
                                            <h5 className={cx('title')}>
                                                <a href="#" target='_self'> Nostrud exercitation</a>
                                            </h5>
                                            <div className={cx('description')}>
                                            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                            <span>15 April 2024</span>
                                        </div>
                                    </li>
                                    <li className={cx('news-items')}>
                                        <a href="#" target='_self'>
                                            <img className={cx('news-thumb')} src="./images/img_rectangle_22_100x100.png" alt="image" />
                                        </a>
                                        <div className={cx('news-container')}>
                                            <h5 className={cx('title')}>
                                                <a href="#" target='_self'> Nostrud exercitation</a>
                                            </h5>
                                            <div className={cx('description')}>
                                            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                            <span>15 April 2024</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
                <section className={cx('index-module_row')}>
                    <section className={cx('index-module_col', 'index-module_l-12')}>
                        <div className={cx('bottom')}>
                            <div className={cx('copyright')}>
                                © 2022 Arihant. All Rights Reserved.
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