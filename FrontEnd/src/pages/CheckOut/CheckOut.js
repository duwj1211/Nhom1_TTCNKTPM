import classNames from 'classnames/bind';
import styles from './CheckOut.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

const LocationFilter = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleCityChange = (event) => {
        const selectedCityId = event.target.value;
        setSelectedCity(selectedCityId);
        const selectedCityData = cities.find(city => city.Id === selectedCityId);
        setDistricts(selectedCityData ? selectedCityData.Districts : []);
    };
    
    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        setSelectedDistrict(selectedDistrictId);
        const selectedDistrictData = districts.find(district => district.Id === selectedDistrictId);
        setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    };
    const handleWardChange = (event) => {
        const selectedWardId = event.target.value;
        setSelectedWard(selectedWardId);
    };

    return(
        <div className={cx("select-address")}>
            <div className={cx("country")}>
                <label htmlFor="coun" className="form-label">Tỉnh / Thành phố<span className={cx("required")}>*</span></label>
                <select id="coun" className="form-select" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map(city => (
                        <option key={city.Id} value={city.Id}>{city.Name}</option>
                    ))}
                </select>
            </div>
            <div className={cx("district")}>
                <label  className="form-label">Quận / Huyện<span className={cx("required")}>*</span></label>
                <select id="reg-district" className="form-select" value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">Chọn quận / huyện</option>
                    {districts.map(district => (
                        <option key={district.Id} value={district.Id}>{district.Name}</option>
                    ))}
                </select>
            </div>
            <div className={cx("street")}>
                <label className="form-label">Phường / Xã<span className={cx("required")}>*</span></label>
                <select id="ward" className="form-select" value={selectedWard} onChange={handleWardChange}>
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map(ward => (
                        <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                    ))}
                </select>
            </div>   
        </div> 
    )
}

export default function CheckOut(){
    return(
        <div className={cx("main-content")}>
            <div className={cx("main")}>
                <div className={cx("header")}>
                    <h1>Checkout</h1>
                </div>
                <div>
                    <p>Có mã giảm giá? Nhấn vào đây để nhập mã của bạn</p>
                </div>
                <div className={cx("billing-order")}>
                    <div className={cx("inside-billing-order")}>
                        <h3>Chi tiết hóa đơn</h3>
                        <hr></hr>
                        <form className={cx("billing-details")}>
                            <span className={cx("name")}>
                                <div className={cx("fn")}>
                                    <label htmlFor="firstname" className="form-label">Họ<span className={cx("required")}>*</span></label>
                                    <input className={cx("first-name","form-control")} id="firstname"></input>
                                </div>
                                <div className={cx("ln")}>
                                    <label htmlFor="lastname" className="form-label">Tên<span className={cx("required")}>*</span></label>
                                <input className={cx("last-name","form-control")} id="lastname"></input>
                                </div>
                            </span>
                            <div className={cx("company")}>
                                <label htmlFor="company-name" className="form-label">Tên công ty (Tùy chọn)</label>
                                <input className={cx('form-control')} id="company-name"></input>
                            </div>
                            <div className={cx("email")}>
                                <label htmlFor="inputEmail" className="form-label">Địa chỉ email<span className={cx("required")}>*</span></label>
                                <input className={cx("email-add","form-control")} type="email" id="inputEmail" placeholder="name@example.com"></input>
                                <div id="emailHelp" className="form-text">Chúng tôi sẽ không bao giờ chia sẻ địa chỉ email của bạn cho ai khác.</div>
                            </div>
                            <LocationFilter />
                            <div className={cx("street-address")}>
                                <label className="form-label">Địa chỉ chi tiết<span className={cx("required")}>*</span></label>
                                <input className={cx("street-add","form-control")} placeholder="Số nhà hoặc tên đường"></input>
                            </div>
                            <div className={cx("phone-number")}>
                                <label className="form-label">Số điện thoại<span className={cx("required")}>*</span></label>
                                <input className={cx("phone-num","form-control")} placeholder="+84xxxxxxxxx"></input>
                            </div>
                        </form>
                        <form className={cx("additional-information")}>
                            <div><h3>Thông tin thêm</h3></div>
                            <div><hr></hr></div>
                            <div className={cx("order-notes")}>
                                <label className="form-label">Thêm chú thích (Tùy chọn)</label>
                                <input className={cx("order","form-control")}></input>
                            </div>
                        </form>
                    </div>
                    <div className={cx("order-payment")}>
                        <div className={cx("inside-order-payment")}>
                            <h3>Sản phẩm của bạn</h3>
                            <div className={cx("your-order")}>
                                <table className={cx("your-order-table","table")}>
                                    <thead>    
		                                <tr>
			                                <th className="product-name">Sản phẩm</th>
			                                <th className="product-total">Tổng phụ</th>
		                                </tr>
	                                </thead>
	                                <tbody>
						                <tr className="cart_item">
					                        <td className="product-name">Ark Forging&nbsp;<strong className="product-quantity">×&nbsp;2</strong></td>
					                        <td className="product-total"><span><bdi><span className="woocommerce-Price-currencySymbol">$</span>40.00</bdi></span></td>
				                        </tr>
					                </tbody>
	                                <tfoot>
		                                <tr className="cart-subtotal">
			                                <th>Tổng phụ</th>
			                                <td><span><bdi><span>$</span>40.00</bdi></span></td>
		                                </tr>
		                                <tr className="order-total">
			                                <th>Tổng</th>
			                                <td><strong><span><bdi><span>$</span>40.00</bdi></span></strong></td>
		                                </tr>
	                                </tfoot>
                                </table>
                            </div>        
                            <div className={cx("container")}>
                                <div>
                                    <h3>Chọn phương thức thanh toán</h3>
                                </div>
                                <form>
                                    <input type="radio" name="payment" id="visa" className={cx("visa-check")}/>
                                    <input type="radio" name="payment" id="mastercard" className={cx("mastercard-check")}/>
                                    <input type="radio" name="payment" id="local" className={cx("local-check")}/>
                                    <input type="radio" name="payment" id="payment-on-delivery" className={cx("payment-on-delivery-check")}/>
                                    <div className={cx("category")}>
                                        <label htmlFor="visa" className={cx("visaMethod")}>
                                            <div className={cx("imgName")}>
                                                <div className={cx("imgContainer","visa")}>
                                                    <img src="https://i.ibb.co/vjQCN4y/Visa-Card.png" alt="" />
                                                </div>
                                                <span className="name">Thẻ Visa</span>
                                            </div>
                                            <span className={cx("check")}>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#6064b6' }} />
                                                </span>
                                        </label>
                                        <label htmlFor="mastercard" className={cx("mastercardMethod")}>
                                            <div className={cx("imgName")}>
                                                <div className={cx("imgContainer","mastercard")}>
                                                    <img src="https://i.ibb.co/vdbBkgT/mastercard.jpg" alt="" />
                                                </div>
                                                <span className="name">Thẻ Mastercard</span>
                                            </div>
                                            <span className={cx("check")}>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#6064b6' }} />
                                            </span>
                                        </label>
                                        <label htmlFor="local" className={cx("local-bankMethod")}>
                                            <div className={cx("imgName")}>
                                                <div className={cx("imgContainer","local-bank")}>
                                                    <img src="https://www.kindpng.com/picc/m/207-2077709_banks-icon-banks-icon-hd-png-download.png" alt=""></img>
                                                </div>
                                                <span className="name">Ngân hàng nội địa</span>
                                            </div>
                                            <span className={cx("check")}>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#6064b6' }} />
                                            </span>
                                        </label>
                                        <label htmlFor="payment-on-delivery" className={cx("payment-on-deliveryMethod")}>
                                            <div className={cx("imgName")}>
                                                <div className={cx("imgContainer","payment-on-delivery")}>
                                                    <img src="https://i.ibb.co/M1WqwtQ/Pngtree-cash-on-delivery-bagde-olshop-6359688.png" alt="" border="0"></img>
                                                </div>
                                                <span className="name">Thanh toán khi nhận hàng</span>
                                            </div>
                                            <span className={cx("check")}>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#6064b6' }} />
                                            </span>
                                        </label>
                                    </div>
                                </form>
                                <div className={cx("order")}>
                                    <button type='button' className={cx("order-btn","btn","btn-outline-custom")}>Tiến hành thanh toán</button>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}


