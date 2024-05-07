import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/api.service';
import CancelConfirm from '../../layouts/components/Dialog/CancelConfirm';


const cx = classNames.bind('styles');


function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    
    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getUTCFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}


export default function OrderDetail(){
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const {orderId} = useParams();
    const [order, setOrder] = useState();
    const fetchOrderData = async(orderId) => {
        try{
            const response = await ApiService.get(`orders/get/getorderbyid/${orderId}`);
            if(response.status === 200){
                setOrder(response.data.order);
            }else{
                console.log("Error to get order");
            }
        }catch(error){
            console.error("Error to fetch Order data: ", error);
        }
    }
    
    useEffect(() => {
        fetchOrderData(orderId);
    },[]);
    const cancelOrder = async (orderCode) => {
        try{
            setSelectedOrder(orderCode);
            setCancelConfirmationOpen(true);
        }catch(error){
            console.error("Error to cancel order", error);
        }
    }
    const handleCancelConfirmation = async() => {
        try{
            console.log(order);
            console.log(selectedOrder);
            const response = await ApiService.post(`order-payment/cancel-payment/${selectedOrder}`);
            if(response.status === 200){
              try{
                await ApiService.post(`orders/set-status/${order._id}/${0}`);
              }catch(error){
                console.error("Error to set status", error);
              }
              fetchOrderData(orderId);
            }else{
                console.log("Unsuccess");
            }
        }catch(error){
            console.error("Error to cancel order", error);
        }
        setCancelConfirmationOpen(false);
    }
    return(
        <> 
        <CancelConfirm
                open={cancelConfirmationOpen}
                onClose={() => setCancelConfirmationOpen(false)}
                onConfirm={handleCancelConfirmation}
        />
        {order && order.banking === 1 ? (
            <div>
                {order.status === -1 && (
                    <div>
                        <div>Đơn hàng đang chờ thanh toán</div>
                        <button onClick={() => window.location.href = order.link_payment}>
                            Thanh toán ngay
                        </button>
                        <button type='button' onClick={() => cancelOrder(order.orderCode)}>
                            Hủy đơn hàng
                        </button>
                    </div>
                )}
                {order.status === 0 && (
                    <div>Đơn hàng đã bị hủy</div>
                )}
                {order.status === 1 && (
                    <div>Đơn hàng đã thanh toán</div>
                )}
            </div>
        ) : (
            <div>
                Thanh toán khi nhận hàng
            </div>
        )
        }
            <div>
                Xin chào
            </div>
            <table className={cx("your-order-table", "table")}>
                    <thead>
                      <tr>
                        <th className="product-name">Sản phẩm</th>
                        <th className="product-total">Tổng phụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order && order.items.map((item, index) => (
                      <React.Fragment key ={index}>
                      <tr className={cx("cart_item")}>
                        <td className="product-name">
                          {item.book.name}&nbsp;
                          <strong className="product-quantity">×&nbsp;{item.quantity}</strong>
                        </td>
                        <td className="product-total">
                          <span>
                            <bdi>
                              <span>
                                {(item.book.priceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              </span>
                              VND
                            </bdi>
                          </span>
                        </td>
                      </tr>
                      </React.Fragment>
                      ))}
                    </tbody>
                    <tfoot>
                      {order && (
                      <React.Fragment>
                      <tr className="cart-subtotal">
                        <th>Tổng phụ</th>
                        <td>
                          <span>
                            <bdi>
                              <span>{(order.totalPriceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>VND
                            </bdi>
                          </span>
                        </td>
                      </tr>
                      <tr className="order-total">
                        <th>Tổng</th>
                        <td>
                          <strong>
                            <span>
                              <bdi>
                                <span>{(order.totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>VND
                              </bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr className="order-date">
                        <th>Ngày đặt hàng</th>
                        <td>
                          <strong>
                            <span>
                              <bdi>
                                <span>{formatDate(order.createdAt)}</span>
                              </bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr className="order-method">
                        <th>Hình thức thanh toán</th>
                        <td>
                          <strong>
                            <span>
                              <bdi>
                                <span>{order.banking === 1 ? "Chuyển khoản ngân hàng" : 
                                       order.banking === 0 ? "COD (Thanh toán khi nhận hàng)" : ""}</span>
                              </bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                      </React.Fragment>
                      )}
                    </tfoot>
            </table>
        </>
    )
}