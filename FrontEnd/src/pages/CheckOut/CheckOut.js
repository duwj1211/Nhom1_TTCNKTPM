import classNames from "classnames/bind";
import styles from "./CheckOut.module.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ApiService from '../../service/api.service';

const cx = classNames.bind(styles);

export default function CheckOut() {
  const [cart, setCart] = useState();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [formState, setFormState] = useState({
    fullName: "",
    detailAddress: "",
    phoneNumber: "",
    note: "",
    city: "",
    district: "",
    ward: "",
  });
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
  useEffect(() => {
    fetchCartData();
    console.log(cart);
}, [])
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  function deleteError(name) {
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    deleteError(name);
  };
  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedCity(selectedCityId);
    const selectedCityData = cities.find((city) => city.Id === selectedCityId);
    setFormState({ ...formState, city: selectedCityData.Name });
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    deleteError("city");
  };
  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    const selectedDistrictData = districts.find(
      (district) => district.Id === selectedDistrictId
    );
    setFormState({ ...formState, district: selectedDistrictData.Name });
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    deleteError("district");
  };
  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    const selectedWardData = wards.find((ward) => ward.Id === selectedWardId);
    setFormState({ ...formState, ward: selectedWardData.Name });
    setSelectedWard(selectedWardId);
    deleteError("ward");
  };

  const validateForm = (values) => {
    let errors = {};
    // Họ tên không được để trống
    if (!values.fullName) {
      errors.fullName = "Họ tên người nhận là bắt buộc";
    }
    if (!values.detailAddress) {
      errors.detailAddress = "Địa chỉ là bắt buộc";
    }
    const phoneRegExp = /^(\+84|0[3|5|7|8|9])([0-9]{8})\b/;
    if (!values.phoneNumber) {
      errors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!phoneRegExp.test(values.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không đúng định dạng";
    }
    if (!values.city) {
      errors.city = "Vui lòng chọn tỉnh/thành phố";
    }
    if (!values.district) {
      errors.district = "Vui lòng chọn quận/huyện";
    }
    if (!values.ward) {
      errors.ward = "Vui lòng chọn xã phường";
    }
    return errors;
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    const validationErrors = validateForm(formState);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try{
          const YOUR_DOMAIN = 'http://localhost:3000';
          const response = await ApiService.post("order-payment/create",{
              orderCode: Number(String(Date.now()).slice(-6)),
              amount: 2000,
              description: 'Thanh toan don hang',
              returnUrl: `${YOUR_DOMAIN}`,
              cancelUrl: `${YOUR_DOMAIN}/CheckOut`
          })
          const link_payment = response.data.data.checkoutUrl;
          window.location.href = link_payment;
          console.log(response);
      }catch(error){
        console.error('Error creating payment link:', error);
      }
    }
  };

  return (
    <div className={cx("main-content", "container")}>
      <div className={cx("main")}>
        <div className={cx("header")}>
          <h1>Checkout</h1>
        </div>
        <div>
          <p>Thông tin thanh toán</p>
        </div>
        <div className={cx("row gy-4")}>
          <div className={cx("col-12 col-md-7")}>
            <h3>Chi tiết hóa đơn</h3>
            <hr></hr>
            <form className={cx("billing-details")}>
              <div className={cx("fn")}>
                <label htmlFor="firstname" className="form-label">
                  Họ tên người nhận<span className={cx("required")}>*</span>
                </label>
                <input
                  className={cx("first-name", "form-control")}
                  id="firstname"
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <p className={cx("error-message")}>{errors.fullName}</p>
                )}
              </div>
              <div className={cx("phone-number")}>
                <label className="form-label">
                  Số điện thoại<span className={cx("required")}>*</span>
                </label>
                <input
                  className={cx("phone-num", "form-control")}
                  placeholder="+84xxxxxxxxx"
                  type="text"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <p className={cx("error-message")}>{errors.phoneNumber}</p>
                )}
              </div>
              <div className={cx("select-address")}>
                <div className={cx("country")}>
                  <label htmlFor="coun" className="form-label">
                    Tỉnh / Thành phố<span className={cx("required")}>*</span>
                  </label>
                  <select
                    id="coun"
                    className="form-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className={cx("error-message")}>{errors.city}</p>
                  )}
                </div>
                <div className={cx("district")}>
                  <label className="form-label">
                    Quận / Huyện<span className={cx("required")}>*</span>
                  </label>
                  <select
                    id="reg-district"
                    className="form-select"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Chọn quận / huyện</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className={cx("error-message")}>{errors.district}</p>
                  )}
                </div>
                <div className={cx("street")}>
                  <label className="form-label">
                    Phường / Xã<span className={cx("required")}>*</span>
                  </label>
                  <select
                    id="ward"
                    className="form-select"
                    value={selectedWard}
                    onChange={handleWardChange}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                  {errors.ward && (
                    <p className={cx("error-message")}>{errors.ward}</p>
                  )}
                </div>
              </div>
              <div className={cx("street-address")}>
                <label className="form-label">
                  Địa chỉ chi tiết<span className={cx("required")}>*</span>
                </label>
                <input
                  className={cx("street-add", "form-control")}
                  placeholder="Số nhà hoặc tên đường"
                  type="text"
                  name="detailAddress"
                  value={formState.detailAddress}
                  onChange={handleInputChange}
                />
                {errors.detailAddress && (
                  <p className={cx("error-message")}>{errors.detailAddress}</p>
                )}
              </div>
            </form>
            <form className={cx("additional-information")}>
              <div>
                <h3>Thông tin thêm</h3>
              </div>
              <div>
                <hr></hr>
              </div>
              <div className={cx("order-notes")}>
                <label className="form-label">Thêm chú thích (Tùy chọn)</label>
                <input
                  className={cx("order", "form-control")}
                  type="text"
                  name="note"
                  value={formState.note}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className={cx("col-12 col-md-5")}>
            <div className={cx("order-payment")}>
              <div className={cx("inside-order-payment")}>
                <h3>Sản phẩm của bạn</h3>
                <div className={cx("your-order")}>
                  <table className={cx("your-order-table", "table")}>
                    <thead>
                      <tr>
                        <th className="product-name">Sản phẩm</th>
                        <th className="product-total">Tổng phụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart && cart.items.map((item, index) => (
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
                      {cart && (
                      <React.Fragment>
                      <tr className="cart-subtotal">
                        <th>Tổng phụ</th>
                        <td>
                          <span>
                            <bdi>
                              <span>{(cart.totalPriceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>VND
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
                                <span>{(cart.totalPriceFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>VND
                              </bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                      </React.Fragment>
                      )}
                    </tfoot>
                  </table>
                </div>
                <div className={cx("order-container")}>
                  <div>
                    <h3>Chọn phương thức thanh toán</h3>
                  </div>
                  <form>
                    <input
                      type="radio"
                      name="payment"
                      id="local"
                      className={cx("local-check")}
                    />
                    <input
                      type="radio"
                      name="payment"
                      id="payment-on-delivery"
                      className={cx("payment-on-delivery-check")}
                    />
                    <div className={cx("category")}>
                      <label htmlFor="local" className={cx("local-bankMethod")}>
                        <div className={cx("imgName")}>
                          <div className={cx("imgContainer", "local-bank")}>
                            <img
                              src="https://i.ibb.co/0K2tB6Q/qr-code-1.png"
                            ></img>
                          </div>
                          <span className="name">Chuyển khoản ngân hàng (Quét mã QR)</span>
                        </div>
                        <span className={cx("check")}>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: "#6064b6" }}
                          />
                        </span>
                      </label>
                      <label
                        htmlFor="payment-on-delivery"
                        className={cx("payment-on-deliveryMethod")}
                      >
                        <div className={cx("imgName")}>
                          <div
                            className={cx(
                              "imgContainer",
                              "payment-on-delivery"
                            )}
                          >
                            <img
                              src="https://i.ibb.co/M1WqwtQ/Pngtree-cash-on-delivery-bagde-olshop-6359688.png"
                              alt=""
                              border="0"
                            ></img>
                          </div>
                          <span className="name">Thanh toán khi nhận hàng</span>
                        </div>
                        <span className={cx("check")}>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: "#6064b6" }}
                          />
                        </span>
                      </label>
                    </div>
                  </form>
                  <div className={cx("order")}>
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className={cx("btn", "btn-outline-custom")}
                    >
                      Tiến hành đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
