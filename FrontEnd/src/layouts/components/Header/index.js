import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
function Header() {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q'));
  const navigate = useNavigate();
  function hadleSearch(e) {
    e.preventDefault();
    navigate(`/books?q=${inputValue}`);
  }

  return (
    <header className={cx('wrap')}>
      <div className={cx('top-header')}>
        <div className='container d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <i className="fas fa-phone-alt"></i>
            <span className='ms-2'>+84 98998888</span>
          </div>
          <div className='d-flex align-items-centen gap-4'>
            <span className={cx('social-icon')}><i className="fab fa-facebook-f"></i></span>
            <span className={cx('social-icon')}><i className="fab fa-instagram"></i></span>
            <span className={cx('social-icon')}><i className="fab fa-linkedin-in"></i></span>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className={cx('main-header')}>
          <Link to='/' className={cx('logo')}>
            <span className={cx('highlight')}>One</span>book
          </Link>
          <form onSubmit={hadleSearch} className={cx('search-wrap')}>
            <input type='text' value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            placeholder='Tìm kiếm' 
            autoComplete='off' spellCheck="false" />
            <div className={cx('search-btn')}>
              <i className="far fa-search"></i>
            </div>
          </form>
          <div className={cx('header-action')}>
            <NavLink to='#'>
              <span className={cx('icon')}><i className="far fa-user"></i></span>
              <NavLink to='/login' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Đăng nhập</span></NavLink>
            </NavLink>
            <div className={cx('device')}></div>
            <NavLink to='/cart'>
              <span className={cx('icon')}><i className="far fa-shopping-bag"></i></span>
              <span className='d-none d-md-inline'>Giỏ hàng</span>
            </NavLink>
          </div>
        </div>
        <div className={cx('nav-header')}>
          <NavLink to='/' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Trang chủ</span></NavLink>
          <NavLink to='/books' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Sách</span></NavLink>
          <NavLink to='/new-release' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Mới phát hành</span></NavLink>
          <NavLink to='/authors' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Tác giả</span></NavLink>
          <NavLink to='/contact' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Liên hệ</span></NavLink>
        </div>
      </div>
    </header>
  )
}
export default Header;