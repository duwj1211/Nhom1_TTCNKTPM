import classNames from 'classnames/bind';
import styles from './AuthorDetail.module.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../../service/api.service";
import BookInfo from '../BookDetails/BookInfo';
import RelatedBook from '../BookDetails/RelatedBook';

const cx = classNames.bind(styles);

function AuthorDetail() {
    const { slug } = useParams();   
    const [author, setAuthor] = useState([])
    const [book, setBook] = useState([])
    const [bookSlug, setBookSlug] = useState()
    const [isLoading, setIsLoading] = useState(true);

    async function getAuthor() {
        try {
            const response = await ApiService.get(`authors/${slug}`);
            if (response.status === 200) {
                const item = response.data;
                setAuthor(item.author);
                setBookSlug(item.books[0].slug)
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error find author:", error);
        }
    }
    
    useEffect(() => { 
        getAuthor();
    }, [slug]);
    
    async function getBook() {
        try {
            if (bookSlug !== undefined) {
                const response = await ApiService.get(`books/${bookSlug}`);
                if (response.status === 200) {
                    const item = response.data;
                    setBook(item);
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                }
            }
        } catch (error) {
            console.error("Error find book:", error);
        }
    }

    useEffect(() => { 
        getBook();
    }, [bookSlug]);

    console.log(book.categories)

    return ( 
        <>
            {(author) && (
                <div className={cx('bg')}>
                    <div className={cx("all-author-nav")}>
                        <Link className={cx("author-nav-home")} to="/">
                            TRANG CHỦ
                        </Link>
                        <p>/</p>
                        <div>{author.fullName}</div>
                    </div>
                    <div className={cx('container')}>
                        <div className="row"> 
                            <div className="offset-lg-1 offset-xl-1 col-xl-9 col-lg-10 col-md-12 col-sm-12 col-12">
                                <div className={cx('row', 'info-author')}>
                                    <div className="col-md-4">
                                        <div className={cx('author-avt')}>
                                            <img src={author.avatar} alt='Book img'></img>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <h1 className={cx('author-name')}>{author.fullName}</h1>
                                        <div className={cx('author-content')}>
                                            <p>{author.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product-author')}>
                        <div className={cx('container')}>
                            <div className={cx('content-area')}>
                                {isLoading ? ( // Kiểm tra isLoading trước khi hiển thị component
                                    <p>Loading...</p>
                                ) : (
                                    book && <BookInfo bookInfo={book} />
                                )}
                            </div>
                        </div>
                    </div>
                    {book && (
                        <div className={cx('section-related-book')}>
                            <div className={cx('container')}>
                                <div className={cx('related-area')}>
                                    <RelatedBook 
                                        categories = {book.categories}
                                        slug = {book.slug}
                                    />
                                </div>
                            </div>
                        </div>)}
                </div>
            )}
        </>
    );
}

export default AuthorDetail;