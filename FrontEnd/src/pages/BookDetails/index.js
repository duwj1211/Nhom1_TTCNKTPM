import classNames from 'classnames/bind';
import styles from './BookDetails.module.css';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import ApiService from "../../service/api.service";
import TabsComponent  from './TabsComponent';
import BookReview from './BookReview';
import RelatedBook from './RelatedBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BookInfo from './BookInfo';

const cx = classNames.bind(styles);

function BookDetails() {
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const [reviews,setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

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
    useEffect(() => { 
        async function getBookReview() {
            try {
              const response = await ApiService.get(`books/${slug}`);
              if (response.status === 200) {
                const item = response.data;
                setReviews(item.reviews);
                calculateAverageRating(item.reviews);
              }
            } catch (error) {
              console.error("Error find book:", error);
            }
          }
        //   getBookReview();
    }, [reviews]);

    const calculateAverageRating = async(reviews) => {
        if (reviews.length === 0) return 0;
        let totalRating = 0;
        console.log(reviews);
        reviews.forEach(item => {
            totalRating += item.rating;
        });
        const averageRating = totalRating / reviews.length
        setAverageRating(averageRating.toFixed(1));
    };
    
    return ( 
        <>
            { book && (
                <div className={cx('bg')}>
                    <div className={cx('container')}>
                        <div className={cx('content-area')}>
                            <div className={cx('wrap-book-item')}>
                                <BookInfo bookInfo = {book}/> 
                                <div className='average-rating'>
                                    {averageRating}/5 <FontAwesomeIcon icon={faStar} className={cx('yellow-star')}/> ({reviews.length} lượt đánh giá)
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
