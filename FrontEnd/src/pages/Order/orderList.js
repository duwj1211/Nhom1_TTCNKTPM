import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../service/api.service';
import setStatus from './orderStatus';

const cx = classNames.bind('styles');

function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes} ${day}/${month}/${year}`;
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
        <div>
           <div className='table-responsive'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Phương thức thanh toán</th>     
                        <th scope="col">Tổng số phụ</th>
                        <th scope="col">Tổng giá</th>
                        <th scope="col">Trạng thái thanh toán</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => ( 
                        <React.Fragment key={index}>
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.banking === 1 ? "Chuyển khoản ngân hàng":"Thanh toán khi nhận hàng"}</td>                       
                            <td>{item.totalPriceFinal}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.status === -1 ? "Đang chờ thanh toán" : 
                                 item.status === 0 ? "Đã hủy" :
                                 item.status === 1 ? "Đã thanh toán" : ""}
                            </td>
                            <td>
                                <Link to={`/order/detail/${item._id}`}>
                                    Chi tiết
                                </Link>
                            </td>
                        </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>                     
        </div>
        
    )
}