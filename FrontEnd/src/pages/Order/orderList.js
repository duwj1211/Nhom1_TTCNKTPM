import classNames from 'classnames/bind';
import style from './orderList.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../service/api.service';
import setStatus from './orderStatus';

const cx = classNames.bind(style);

function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getMinutes().toString().padStart(2, '0'); 
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function OrderList(){
    const [orders, setOrderItem] = useState([]);
    const [fetching, setFetching] = useState(false);
    const fetchData = async() => {
        try {
            const response = await ApiService.get('orders/get/user/');
            if (response.status === 200 ) {
                setOrderItem(response.data.order);
                setStatus(response.data.order);
                console.log(response.data.order);
            } else {
                console.log('Error: Unable to fetch order');
            }
        } catch (error) {
            console.log('Error fetching order:', error);
        } finally {
            setTimeout(() => {
                setFetching(false);
            }, 4000);
        }
    }
    useEffect(() => {
        if (!fetching) {
            setFetching(true);
            fetchData();
        }
    },[fetching]);
    return(
        <div className={cx('container')}>
            <h3 className={cx('text-center', 'py-3')}>Danh sách đơn hàng</h3>
            <div className={cx('order-wrap')}>
                {orders.map((order, index) => (
                    <div className={cx('order')} key={order._id}>
                        <div className={cx('d-flex align-items-center justify-content-between', 'order-header')}>
                            <span>Ngày: {formatDate(order.createdAt)}</span>
                            <span className={
                                order.status === -1 ? cx('order-status','wait') : 
                                order.status === 0 ? cx('order-status','cancel') :
                                order.status === 1 ? cx('order-status','done') : ""
                            }>
                                {order.status === -1 ? "Đang chờ thanh toán" : 
                                 order.status === 0 ? "Đã hủy" :
                                 order.status === 1 ? "Đã thanh toán" : ""}
                            </span>
                        </div>
                        <div className={cx('list-order')}>
                            {order.items.map(item => (
                                <Link to={`/detail/${item.book.slug}`} className={cx('order-item')} key={item._id}>
                                    <div className={cx('item-image')}>
                                        <img src={item.book.avatar}/>
                                    </div>
                                    <div className={cx('item-info', 'flex-grow-1')}>
                                        <div className={cx('d-flex align-item-center justify-content-between')}>
                                            <div className={cx('item-name')}>{item.book.name}</div>
                                            <span>Số lượng: {item.quantity}</span>
                                        </div>
                                        <div className={cx('mt-4 d-flex justify-content-end column-gap-3')}>
                                            <span className={cx('price-original', 'price')}>{(item.priceOriginal / 1000).toFixed(3)}₫</span>
                                            <span className={cx('price-final', 'price')}>{(item.priceFinal / 1000).toFixed(3)}₫</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className={cx('order-footer')}>
                            <Link to={`/order/detail/${order._id}`} className={cx('orders-link')}>
                                Xem chi tiết
                            </Link>
                            <div>
                                Thành tiền: 
                                <span className={cx('price-final', 'price')}> {(order.totalPriceFinal / 1000).toFixed(3)}₫</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}