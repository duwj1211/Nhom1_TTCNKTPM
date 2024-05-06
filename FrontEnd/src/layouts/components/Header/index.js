import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ApiService from '../../../service/api.service'

const cx = classNames.bind(styles)
function Header() {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || "" );
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  function hadleSearch(e) {
    e.preventDefault();
    navigate(`/books?q=${inputValue}`);
  }
  function handleLogout() {
    document.cookie = "token"+'=; Max-Age=-99999999;';
    navigate("/login");
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  async function getCates() {
    try {
      const res = await ApiService.get("categories");
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    getCates();
  }, []);
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
            <NavLink to='/cart'>
              <span className={cx('icon')}><i className="far fa-shopping-bag"></i></span>
              <span className='d-none d-md-inline'>Giỏ hàng</span>
            </NavLink>
            <div className={cx('device')}></div>
            {
              !isLogin && <NavLink to='/login'>
                <span className={cx('icon')}><i className="fal fa-sign-in"></i></span>
                <span className='d-none d-md-inline'>Đăng nhập</span>
              </NavLink>
            }
            {
              isLogin &&
              <div className={cx('account')}>
                <NavLink to='/account'>
                  <span className={cx('icon')}><i className="far fa-user"></i></span>
                  <span className='d-none d-md-inline'>Tài khoản</span>
                </NavLink>
                <div className={cx('child-action')}>
                  <div onClick={handleLogout}>
                    <span className={cx('icon')}><i className="fal fa-sign-out"></i></span>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className={cx('nav-header')}>
          <NavLink to='/' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Trang chủ</span></NavLink>
          <div className={cx('nav-parent')}>
            <NavLink to='/books' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Sách</span></NavLink>
            <div className={cx('child-wrap')}>
              <div className='row'>
                {categories.map((cate, index) => (
                  <div key={cate._id} className='col-12 col-md-4'>
                    <NavLink to={`/category/${cate.slug}`} className={(nav) => cx('nav-child', { active: nav.isActive })}>{cate.name}</NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <NavLink to='/new-release' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Mới phát hành</span></NavLink>
          <NavLink to='/authors' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Tác giả</span></NavLink>
          <NavLink to='/contact' className={(nav) => cx('nav-link', { active: nav.isActive })}><span>Liên hệ</span></NavLink>
        </div>
      </div>
    </header>
  )
}
export default Header;