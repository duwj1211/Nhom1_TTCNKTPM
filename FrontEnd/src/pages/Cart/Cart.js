import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const alert = ({message, type}) => {
    return(
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    )
}

export default function Cart(){
    const handleButtonClick = () =>{
        window.location.href = "/CheckOut"
    }
    return(
        <div className={cx('main-content')}>
            <div className={cx('cart')}>
                <div className={cx('header')}>
                    <header>
                        <div>
                            <h1 className={cx('title')} >Giỏ hàng</h1>
                        </div>
                    </header>
                </div>
                <div className={cx('list-books')}>
                    <form>
                        <table className={cx('table-list-books','table')}>
                            <thead>
                                <tr>
                                    <th className='remove-item'></th>
                                    <th className='product-thumbnail'></th>
                                    <th className='product-name'>Sản phẩm</th>
                                    <th className='product-price'>Giá</th>
                                    <th className='product-quantity'>Số lượng</th>
                                    <th className='product-subtotlal'>Tổng phụ</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr >
                                    <td className={cx("product-remove")}>
                                        <a><span className="ahfb-svg-iconset ast-inline-flex"><svg className="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg></span></a>
                                    </td>
                                    <td className={cx("product-thumbnail")}>
                                        <a><img fetchpriority="high" decoding="async" width="100" height="150" src="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/05/author-book-store-book-cover-07-300x450.jpg" srcset="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/05/author-book-store-book-cover-07-300x450.jpg 300w, https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/05/author-book-store-book-cover-07-200x300.jpg 200w, https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/05/author-book-store-book-cover-07.jpg 400w" sizes="(max-width: 300px) 100vw, 300px"></img></a>						
                                    </td>
                                    <td className={cx("product-name")}data-title="Product">
                                        <a>The Throned Mirror</a>						
                                    </td>
                                    <td className={cx("product-price")} data-title="Price">
                                        <span ><bdi><span>$</span>23.00</bdi></span>						
                                    </td>
                                    <td className={cx("product-quantity")} data-title="Quantity">
                                        <div >
                                            <input className={cx("quantity-input")} type="number" id="quantity_660abf30afbb2" name="cart[58ae749f25eded36f486bc85feb3f0ab][qty]"  aria-label="Product quantity" size="4" min="0" max="" step="1" placeholder="" inputmode="numeric" autoComplete="on"></input>
                                        </div>
                                    </td>
                                    <td className={cx("product-subtotal")} data-title="Subtotal">
                                        <span><bdi><span>$</span>23.00</bdi></span>						
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <div className={cx("coupon")}>
                                            <div className="form-floating mb-1">
                                                <input type="email" className={cx("coupon-input","form-control")} id="floatingInput" placeholder="Coupon code"></input>
                                                <label for="floatingInput">Mã giảm giá</label>
                                            </div>
                                            <button type="button" className={cx("apply-btn","btn","btn-outline-custom")}>Áp dụng </button>
                                            <button type="button" className={cx("update-btn","btn","btn-outline-custom")} disabled = "">Cập nhật</button>                                     
                                            <input type="hidden"  value="d060906fb3"></input><input type="hidden"  value="/book-store-02/cart/"></input>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className={cx('cart-totals')}>
                    <table className={cx('cart-total-table','table')}>
                        <thead>
                            <tr>
                                <th colspan="2"><h2>Tổng số trong giỏ hàng</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Tổng phụ</th>
                                <td><span><bdi><span>$</span>23.00</bdi></span></td>
                            </tr>
                            <tr>
                                <th>Tổng</th>
                                <td><span><bdi><span>$</span>23.00</bdi></span></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div className={cx("process-checkout")}><button type='button' className={cx("checkout-btn","btn","btn-outline-custom")} onClick={handleButtonClick}>Tiến hành thanh toán</button></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



