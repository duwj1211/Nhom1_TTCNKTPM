import classNames from 'classnames/bind';
import styles from './BookDetails.module.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import ApiService from "../../service/api.service";
import TabsComponent  from './TabsComponent';
import BookReview from './BookReview';
import RelatedBook from './RelatedBook';

const cx = classNames.bind(styles);

function BookDetails() {
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => { 
        async function getBook() {
            try {
              const response = await ApiService.get(`books/${slug}`);
              if (response.status === 200) {
                const item = response.data;
                setBook(item);
                window.scrollTo(0, 0);
              }
            } catch (error) {
              console.error("Error find book:", error);
            }
          }
          getBook();
    }, [slug]);
    
    const limitWord = (description, maxLength) => {
        const data = description.split(' ');
        if (data.length <= maxLength) {
          return data.slice(0, data.length).join(' ');
        }
        return data.slice(0, maxLength).join(' ') + '...';
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = async (bookId, quantity) => {
        try{
            const response = await ApiService.post('carts/add', {
                bookId,
                quantity
            })
            if(response.status === 200){
                toast.success('Thêm vào giỏ hàng thành công!', {
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
            console.error('Error add to cart:',error);
        }
    }

    return ( 
        <>
            { book && (
                <div className={cx('bg')}>
                    <div className={cx('container')}>
                        <div className={cx('content-area')}>
                            <div className={cx('wrap-book-item')}>
                                <div className={cx('details')}>
                                    <div className={cx('big-img')}>
                                        <img src={book.avatar} alt='Book img'></img>
                                    </div>
                                    <div className={cx('grid')}>
                                        <div className={cx('book-info')}>
                                            <h4 className={cx('book-title')}>{book.name}</h4>
                                            <div className={cx('book-price')}>
                                                <p className={cx('book-final-price')}>{(book.priceFinal / 1000).toFixed(3)} VNĐ</p>
                                                <p className={cx('book-original-price')}>{(book.priceOriginal / 1000).toFixed(3)} VNĐ</p>
                                            </div>
                                            <p className={cx('book-desc')}>
                                                {limitWord(book.description, 50)}
                                                <a className={cx('read-more-desc')} href="#description-tabs">
                                                    Read More
                                                </a>
                                            </p>
                                            <div className={cx('remain-quantity')}>
                                                <span>Còn hàng:&nbsp;</span> 
                                                <span>{book.quantity} sản phẩm</span>
                                            </div>
                                            <div className={cx('cart')}>
                                                <input className={cx('quantity')} type='number' id='quantity'  aria-label='Product quantity' size='4' min='1' max={book.quantity} step='1' value={quantity} placeholder='' inputMode='numeric' autoComplete='on' onChange={handleChange}></input>
                                                <button type='button' className={cx('btn')} onClick={() => handleAddToCart(book._id,quantity)}>Add to cart</button>
                                                <ToastContainer 
                                                    position="top-right"
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
                                </div>
                            </div>
                            <div className={cx('tab-list-container')}>
                                <TabsComponent 
                                    tabs={[
                                        { name: "Description", content: book.description},
                                        { name: "Review", content: <BookReview />},
                                    ]}
                                    />
                            </div>
                            <div className={cx('wrap-realated-book')}>
                                <RelatedBook 
                                    categories = {book.categories}
                                    slug = {book.slug}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookDetails;
