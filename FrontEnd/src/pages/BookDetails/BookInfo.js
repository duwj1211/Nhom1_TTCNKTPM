import classNames from 'classnames/bind';
import styles from './BookInfo.module.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from "../../service/api.service";

const cx = classNames.bind(styles);

function BookInfo({bookInfo}) {
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setBook(bookInfo);
    }, [bookInfo]);

    const limitWord = (description, maxLength) => {
        const data = description.split(' ');
        if (data.length <= maxLength) {
          return data.slice(0, data.length).join(' ');
        }
        return data.slice(0, maxLength).join(' ') + '...';
    };
    const handleChange = (event, maxQuantity) => {
        let value = event.target.value;
        if(value > maxQuantity){
            event.target.value = maxQuantity;
            value = maxQuantity
        }
        else if(!value){
            value = 1;
            event.target.value = 1;
        }
        setQuantity(value);
    };

    const handleAddToCart = async (bookId, quantity) => {
        try{
            const response = await ApiService.post('carts/add', {
                bookId,
                quantity
            })
            if(response.status === 200){
                toast.success(
                    <div>
                        Thêm vào giỏ hàng thành công! Xem <span onClick={() => navigate('/cart')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Giỏ hàng</span>.
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
                console.log("Successful");
            }else{
                toast.error('Thêm vào giỏ hàng thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log("Unsuccessful");
            }
        }catch(error){
            if (error.response && error.response.status === 401) {
                toast.error(
                    <div>
                        Chưa đăng nhập hoặc phiên đăng nhập hết hạn. Hãy <span onClick={() => navigate('/login')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>đăng nhập</span> để thực hiện thao tác này.
                    </div>, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else{
                console.error('Error add to cart:',error);
                console.error('Error add to cart:',error);
            }
        }
    }

    return (
        (book && <div className={cx("details")}>
            <div className={cx("big-img")}>
                <img src={book.avatar} alt="Book img"></img>
            </div>
            <div className={cx("grid")}>
                <div className={cx("book-info")}>
                    <h4 className={cx("book-title")}>{book.name}</h4>
                    <div className={cx("book-price")}>
                        <p className={cx("book-final-price")}>{(book.priceFinal / 1000).toFixed(3)} VNĐ</p>
                        <p className={cx("book-original-price")}>{(book.priceOriginal / 1000).toFixed(3)} VNĐ</p>
                    </div>
                    <div>
                        <div className={cx("fw-medium mb-2")}>Tác giả: {book.author.fullName}</div>
                        <div className={cx("fw-medium mb-2")}>Dịch giả: {book.translator}</div>
                        <div className={cx("fw-medium mb-2")}>Nhà xuất bản: {book.publisher}</div>
                    </div>
                    <p className={cx("book-desc")}>
                        {limitWord(book.description, 50)}
                        <a className={cx("read-more-desc")} href="#description-tabs">
                            Đọc thêm
                        </a>
                    </p>
                    <div className={cx("remain-quantity")}>
                        <span>Còn hàng:&nbsp;</span>
                        <span>{book.quantity} sản phẩm</span>
                    </div>
                    <div className={cx("cart")}>
                        <input className={cx("quantity")} type="number" id="quantity" aria-label="Product quantity" size="4" min="1" max={book.quantity} step="1" placeholder="" inputMode="numeric" autoComplete="on" defaultValue="1" onChange={(e) => handleChange(e, book.quantity)}></input>
                        <button type="button" className={cx("btn")} onClick={() => handleAddToCart(book._id, quantity)}>
                            Thêm vào giỏ
                        </button>
                        <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            theme="light"
                        />
                    </div>
                </div>
            </div>
        </div>)
    );
}

export default BookInfo;
