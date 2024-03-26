import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Header() {
  return (
    <header className={cx('wrap')}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-2 col-md-3'>
            <Link to={''} className={cx('logo')}>
              <img width="64" height="62" src="//bizweb.dktcdn.net/100/363/455/themes/918830/assets/logo.png?1704690471681" alt="Nhã Nam" />
            </Link>
          </div>
          <div className='col-9 col-md-3 col-xl-7 col-lg-6'>
            <div className={cx('nav-head')}>
              <ul className={cx('nav-list')}>
                <li className={cx('nav-item')}><Link to={'#'}>Trang chủ</Link></li>
                <li className={cx('nav-item')}>
                  <Link to={'#'}>Tin sách</Link>
                  <i class="far fa-chevron-down"></i>
                  </li>
                <li className={cx('nav-item')}><Link to={'#'}>Sách Nhã Nam</Link></li>
                <li className={cx('nav-item')}><Link to={'#'}>Tác giả</Link></li>
                <li className={cx('nav-item')}><Link to={'#'}>Cuộc thi</Link></li>
                <li className={cx('nav-item')}><Link to={'#'}>Về Nhã Nam</Link></li>
                <li className={cx('nav-item')}><Link to={'#'}>Liên hệ</Link></li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 col-xl-3 col-lg-4 col-12 mb-block'>
            <div className='d-flex align-items-center h-100 justify-content-between'>
              <div className={cx('search-wrap')}>
                <input type='text' name='query'
                  placeholder='Tìm kiếm' autoComplete='off'
                />
                <div className={cx('search-btn')}>
                  <i className="far fa-search"></i>
                </div>
              </div>
              <div>
                <span className={cx('icon')}><i className="far fa-user"></i></span>
                <Link to={'/cart'}>
                  <span className={cx('icon')}>
                    <i className="far fa-shopping-bag"></i>
                    <span className={cx('count-item')}>{2}</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;