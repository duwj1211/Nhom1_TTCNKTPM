import classNames from 'classnames/bind';
import styles from './Sales.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Sales() {
    return ( 
        <div className={cx('slideshow')}>
            <div className={cx('slideshowSlider')}>
                <div className={cx('slide')}>
                    <div className={cx('row')}>
                        <div className={cx('column', 'col-half')}>
                            <h2 className={cx('heading')}>
                                All books are 50% off now! Don't miss such a deal!
                            </h2>
                            <p className={cx('description')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.
                            </p>
                            <div className={cx('timer-container')}>
                                <ul>
                                    <li>
                                        <span className={cx('days')}>32</span> Days
                                    </li>
                                    <li>
                                        <span className={cx('hours')}>01</span> Hour
                                    </li>
                                    <li>
                                        <span className={cx('minutes')}>27</span> Mint
                                    </li>
                                    <li>
                                        <span className={cx('seconds')}>55</span> Sec
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('column', 'col-half')}>
                            <h2 className={cx('heading')}>
                                All books are 50% off now! Don't miss such a deal!
                            </h2>
                            <p className={cx('description')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.
                            </p>
                            <div className={cx('timer-container')}>
                                <ul>
                                    <li>
                                        <span className={cx('days')}>32</span> Days
                                    </li>
                                    <li>
                                        <span className={cx('hours')}>01</span> Hour
                                    </li>
                                    <li>
                                        <span className={cx('minutes')}>27</span> Mint
                                    </li>
                                    <li>
                                        <span className={cx('seconds')}>55</span> Sec
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Sales;