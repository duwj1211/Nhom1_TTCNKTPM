import classNames from 'classnames/bind';
import styles from './BestSeller.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function BestSeller() {
    return ( 
        <div className={cx('container')}>
            <div className={cx('row')}>
                <img className={cx('book-img')} src='./images/img_book.png' alt='img book' />
                <div className={cx('feature-book')}>
                    <h2 className={cx('heading')}>Feature Book</h2>
                    <div className={cx('break-line')}></div>
                    <div className={cx('author')}>By Timbur hood</div>
                    <h3 className={cx('book-name')}>Birds Gonna Be Happy</h3>
                    <p className={cx('description')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.
                    </p>
                    <div className={cx('price')}>$ 45.00</div>
                    <button className={cx('vm-btn')}>View More
                        <i class={cx('fal', 'fa-arrow-right', 'arrow-right-icon')}></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BestSeller;