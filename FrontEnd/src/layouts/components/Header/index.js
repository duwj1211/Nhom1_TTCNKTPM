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
            
          </div>
          <div className='col-md-6 col-xl-3 col-lg-4 col-12 mb-block'>

          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;