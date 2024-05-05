import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import ApiService from '../../service/api.service';

const cx = classNames.bind('styles');

function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function OrderList(){
    const [order, setOrderItem] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await ApiService.get('orders/get/user/66084000eed56d34dfebdac1');
                if (response.status === 200) {
                    setOrderItem([response.data.order]);
                    console.log("success"); 
                    console.log(order);
                } else {
                    console.log('Error: Unable to fetch order');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        }
        fetchData();
    }, []);

    return(
        <div>
           <div className={cx('table-responsive')}>
                <table className={cx('table-responsive')}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Phương thức thanh toán</th>     
                        <th scope="col">Tổng số phụ</th>
                        <th scope="col">Tổng giá</th>
                        <th scope="col">Trạng thái đơn</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => ( 
                        <React.Fragment key={index}>
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{item.updatedAt && formatDate(item.updatedAt)}</td>
                            <td>Cell</td>                       
                            <td>{item.totalPriceFinal}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.status}</td>
                        </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>                     
        </div>
        
    )
}