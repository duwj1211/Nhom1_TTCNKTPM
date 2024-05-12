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
                        <p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
                                <h3 className={cx('heading')}>Company</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('list-items')}>
                                        <Link to={'/'}>Home</Link>    
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/AboutUs'}>About us</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/Books'}>Books</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/Ebooks'}>Ebooks</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/NewRelease'}>New release</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/ContactUs'}>Contact us</Link>
                                    </li>
                                    <li className={cx('list-items')}>
                                        <Link to={'/Blog'}>Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className='col-lg-5 col-md-12'>
                    <div className={cx('column')}>
                            <div>
                                <h3 className={cx('heading')}>Lastest news</h3>
                                <ul className={cx('news-list')}>
                                    <li className={cx('news-items')}>  
                                        <div className={cx('news-thumb')}>
                                            <Link to={'/'} target='_self' className={cx('link')}>
                                                <img className={cx('image')} src={thumb2} alt="news thumb" />
                                            </Link>
                                        </div> 
                                        <div className={cx('news-container')}>
                                            <h5 className={cx('title')}>
                                                <Link to={'/'} target='_self'> Nostrud exercitation</Link>
                                            </h5>
                                            <div className={cx('description')}>
                                            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </div>
                                            <span>15 April 2024</span>
                                        </div>
                                    </li>
                                    <li className={cx('news-items')}>
                                        <div className={cx('news-thumb')}>
                                            <Link to={'/'} target='_self'>
                                                <img className={cx('image')} src={thumb1} alt="news thumb" />
                                            </Link>
                                        </div> 
                                        
                                        <div className={cx('news-container')}>
                                            <h5 className={cx('title')}>
                                                <Link to={'/'} target='_self'> Nostrud exercitation</Link>
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
                <section className={cx('row')}>
                    <section className='col-lg-12'>
                        <div className={cx('bottom')}>
                            <div className={cx('copyright')}>
                                © 2024 Arihant. All Rights Reserved.
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