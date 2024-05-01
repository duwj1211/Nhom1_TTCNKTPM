import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import styles from './RelatedBook.module.css';

const cx = classNames.bind(styles);

function RelatedBook({categories = [], slug = ''}) {
    const [books, setBooks] = useState([]);
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

    const findBookByCategory = books.filter(book => categories.map(category => book.categories.includes(category)));
    
    const relatedBooks = findBookByCategory.filter(book => book.slug !== slug);

    let settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrow: true,
    };
    
    return ( 
            <div className={cx('related-products')}>
                <h2 className={cx('heading')}>Related products</h2>
                <Slider {...settings} className={cx('slider')}>
                    { relatedBooks.map((book) => (
                        <div key={book._id} className={cx('wrap-book-item')}>
                            <div className={cx('book-item')}>
                                <a href={`/BookDetails/${book.slug}`} className={cx('book-img')}>
                                    <img src={book.avatar} alt='Ảnh Sách' />
                                </a>
                                <div className={cx('book-content')}> 
                                    <a href={`/BookDetails/${book.slug}`} className={cx('book-name')}>{book.name}</a>
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