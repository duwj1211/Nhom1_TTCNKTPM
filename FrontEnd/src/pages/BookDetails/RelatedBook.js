import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import styles from './RelatedBook.module.css';
import Arrow from '../../assets/images/arrow.svg';

const cx = classNames.bind(styles);

function RelatedBook({categories = [], slug = ''}) {
    const [books, setBooks] = useState([]);
    const [relatedBooks, setRelatedBooks] = useState([]);
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button className={cx("slick-prev")} onClick={onClick}>
                <img src={Arrow} alt="prev"/>
            </button>
        );
    };
    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button className={cx("slick-next")} onClick={onClick}>
                <img src={Arrow} alt="next"/>
            </button>
        );
    };
    async function getBooks() {
        try {
        const response = await ApiService.get("books");
        if (response.status === 200) {
            setBooks(response.data.books);
        }
        } catch (err) {
        console.error(err);
        }
    }
    useEffect(() => {
        getBooks();
    }, []);

    const list = books.filter(book => {
        const hasCommonCategory = book.categories.some(bookCategory =>
            categories.some(category => category._id === bookCategory._id)
        );
        return hasCommonCategory && book.slug !== slug;
    });
    
    useEffect(() => {
        setRelatedBooks(list);
    }, [books, categories]);

    let settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    
    return ( 
            <div className={cx('related-products')}>
                <h2 className={cx('heading')}>Có thể bạn cũng thích</h2>
                <Slider {...settings} className={cx('slider')} prevArrow={<CustomPrevArrow />} nextArrow={<CustomNextArrow />}>
                    { relatedBooks.map((book) => (
                        <div key={book._id} className={cx('wrap-book-item')}>
                            <div className={cx('book-item')}>
                                <Link to={`/detail/${book.slug}`} className={cx('book-img')}>
                                    <img src={book.avatar} alt='Ảnh Sách' />
                                </Link>
                                <div className={cx('book-content')}> 
                                    <Link to={`/detail/${book.slug}`} className={cx('book-name')}>{book.name}</Link>
                                    <div className={cx('book-price')}>{book.priceOriginal / 1000}.000 VNĐ</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
    );
}

export default RelatedBook;