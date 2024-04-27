import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import ApiService from '../../service/api.service';
import DeleteConfirm from '../../layouts/components/Dialog/DeleteConfirm';

const cx = classNames.bind(styles);

const alert = ({message, type}) => {
    return(
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    )
}


export default function Cart(){
    const [cart, setCart] = useState();
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const [productName, setProductName] = useState('');
    
    const handleButtonClick = () => {
        window.location.href = "/CheckOut"
    }

    const fetchCartData = async () => {
        try {
            const response = await ApiService.get('carts/user/66084000eed56d34dfebdac1');
            if (response.status === 200) {
                setCart(response.data.cart);
            } else {
                console.log('Error get cart');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }
    /* //Pending
    const updateQuantity = async( userId, cartItemId, quantity) =>{
        try{
            const response = await ApiService.post(`carts/updateQuantity/66084000eed56d34dfebdac1/${cartItemId}/${quantity}`);
            if(response.status === 200){
                fetchCartData();
            }else{
                console.error('Error update quantity cart');
            }
        }catch(error){
            console.error('Error update cart quantity:',error);
        }
    }*/
    const deleteCartItem = async (userId, cartItemId, productName) => {
        console.log(productName);
        try {
            setSelectedCartItem(cartItemId);
            setDeleteConfirmationOpen(true);
            setProductName(productName);
        } catch (error) {
            console.error('Error fetching delete cart:', error);
        }
    }
    const handleDeleteConfirmation = async () => {
        try {
            const response = await ApiService.delete(`carts/delete/66084000eed56d34dfebdac1/${selectedCartItem}`);
            if (response.status === 200) {
                fetchCartData();
            } else {
                console.log('Error delete');
            }
        } catch (error) {
            console.error('Error fetching delete cart:', error);
        }
        setDeleteConfirmationOpen(false);
    }

    useEffect(() => {
        fetchCartData();
    }, [])

    return(
        <div className={cx('main-content')}>
            <DeleteConfirm
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                onConfirm={handleDeleteConfirmation}
                productName={productName}
            />
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
                            <tbody> 
                                {cart && cart.items.map((item, index) => (
                                <React.Fragment key={index}>
                                <tr>
                                    <td className={cx("product-remove")}>
                                        <button type='button' className={cx("remove-button")} onClick={() => deleteCartItem('66084000eed56d34dfebdac1',item._id,item.book.name)}>
                                            <span className="ahfb-svg-iconset ast-inline-flex">
                                                <svg className="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                    <td className={cx("product-thumbnail")}>
                                        <a><img src={item.book.avatar} sizes='60'></img></a>						
                                    </td>
                                    <td className={cx("product-name")}data-title="Product">
                                        <a>{item.book.name}</a>						
                                    </td>
                                    <td className={cx("product-price")} data-title="Price">
                                        <span>{(item.book.priceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</span>						
                                    </td>
                                    <td className={cx("product-quantity")} data-title="Quantity">
                                        <div >
                                            <input className={cx("quantity-input")} type="number" id="quantity_660abf30afbb2"  aria-label="Product quantity" size="4" min="1" max="" step="1" placeholder="" inputMode="numeric" autoComplete="on" defaultValue={item.quantity} /*onChange={()=> updateQuantity('66084000eed56d34dfebdac1',item._id,item.quantity)}*/></input>
                                        </div>
                                    </td>
                                    <td className={cx("product-subtotal")} data-title="Subtotal">
                                        <span>{(item.quantity*item.book.priceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</span>						
                                    </td>
                                </tr>
                                </React.Fragment>
                                ))}
                                <tr>
                                    <td colSpan="6">
                                        <div className={cx("coupon")}>
                                            <div className="form-floating mb-1">
                                                <input type="coupon" className={cx("coupon-input","form-control")} id="floatingInput" placeholder="Coupon code"></input>
                                                <label htmlFor="floatingInput">Mã giảm giá</label>
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
                                <th colSpan="2"><h2>Tổng số trong giỏ hàng</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart && (
                            <React.Fragment>
                            <tr>
                                <th>Tổng phụ</th>
                                <td><span>{(cart.totalPriceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></td>
                            </tr>
                            <tr>
                                <th>Tổng</th>
                                <td><span>{(cart.totalPriceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className={cx("process-checkout")}><button type='button' className={cx("checkout-btn","btn","btn-outline-custom")} onClick={handleButtonClick}>Tiến hành thanh toán</button></div>
                                </td>
                            </tr>
                            </React.Fragment>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



