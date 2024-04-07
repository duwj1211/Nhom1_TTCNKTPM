import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

import { useState } from "react";
const cx = classNames.bind(styles)

function Header() {
  return (
    <header className={cx('wrap')}>
      <div className={cx('top-header')}>
        <div className='container d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <i className="fas fa-phone-alt"></i>
            <span className='ms-2'>+84 989382479</span>
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
          <div className={cx('logo')}>
            OneBook
          </div>
          <div className={cx('search-wrap')}>
            <input type='text' name='query' placeholder='Tìm kiếm' autoComplete='off' />
            <div className={cx('search-btn')}>
              <i className="far fa-search"></i>
            </div>
          </div>
          <div className={cx('header-action')}>
            <NavLink to='#'>
              <span className={cx('icon')}><i className="far fa-user"></i></span>
              <span className='d-none d-md-inline'>Tài khoản</span>
            </NavLink>
            <div className={cx('device')}></div>
            <NavLink to='#'>
              <span className={cx('icon')}><i className="far fa-shopping-bag"></i></span>
              <span className='d-none d-md-inline'>Giỏ hàng</span>
            </NavLink>
          </div>
        </div>
        <div className={cx('nav-header')}>
          <NavLink to='/' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Trang chủ</span></NavLink>
          <NavLink to='/Cart' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Sách</span></NavLink>
          <NavLink to='/Cart' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Mới phát hành</span></NavLink>
          <NavLink to='/Cart' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Tác giả</span></NavLink>
          <NavLink to='/Cart' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Liên hệ</span></NavLink>
        </div>
      </div>
    </header>
  )
}
export default Header;