import classNames from 'classnames/bind';
import React, {useEffect, useState, useRef} from 'react';
import styles from './BookReviews.module.css';
import StarRating from './StarRating';
import ApiService from "../../service/api.service";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookReview() {
    const { slug } = useParams();
    const starRatingRef = useRef();
    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [content, setContent] = useState("");
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();

    const [rating, setRating] = useState(null);

    async function getBookReview() {
            try {
              const response = await ApiService.get(`books/${slug}`);
              if (response.status === 200) {
                const itemReviews = response.data.reviews;
                setReviews(itemReviews);
                window.scrollTo(0, 0);
              }
            } catch (error) {
              console.error("Error find book:", error);
            }
    }
    useEffect(() => {
        getBookReview();
    },[slug])  
    
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(reviews);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await ApiService.post(`/books/${slug}/addreviewbook`,{
                rating: rating,
                content: content
            });
            if(response.status === 200){
                console.log('success');
                getBookReview();
            }else{
                console.log('unsuccess')
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <>  
        <div className={cx('wrap-review-form')}>
            <div className={cx('review-form')}>
                <div className={cx('comment-respond')}>
                    <span className={cx('comment-reply-title')}>
                    </span>
                    <form action='' className={cx('comment-form')}>
                        <p className={cx('comment-notes')}>
                            <span id='email-notes'>Hộ tên của bạn sẽ được hiển thị công khai.&nbsp;</span> 
                            <span className={cx('required-field-message')}>Các trường bắt buộc được đánh dấu&nbsp;
                                <span className={cx('required')}>*</span>
                            </span>
                        </p>
                        <div className={cx('comment-form-rating')}>
                            <label htmlFor='rating'>Your rating&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <StarRating onRatingChange={handleRatingChange}/>
                        </div>
                        <p className={cx('comment-form-comment')}>
                            <label htmlFor='comment'>Đánh giá của bạn&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <textarea className={cx('comment')} cols='45' rows='8' required value={content} onChange={handleContentChange}></textarea>
                        </p>
                        {/* <p className={cx('comment-form-author')}>
                            <label htmlFor='author'>Họ Tên&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <input id='author' name='author' type='text' size='30' required />
                        </p>
                        <p className={cx('comment-form-email')}>
                            <label htmlFor='email'>Email&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <input id='email' name='email' type='email' size='30' required />
                        </p>
                        <p className={cx('comment-form-cookies-consent')}>
                            <input id='wp-comment-cookies-consent' name='wp-comment-cookies-consent' type='checkbox' value='yes' /> 
                            <label className={cx('save')} htmlFor='wp-comment-cookies-consent'>Save my name, email, and website in this browser for the next time I comment.</label>
                        </p> */}
                        <p className={cx('form-submit')}>
                            <input name='submit' type='submit' id='submit' className={cx('submit-btn')} value='Submit' onClick={handleSubmit}/> 
                            <input type='hidden' name='comment_post_ID' value='577' id='comment_post_ID' />
                            <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                        </p>
                    </form>
                </div>
                <div className={cx("users-reviews")}>
                    {reviews && reviews.map((item, index) => (
                        <React.Fragment key={index}>
                            <div>
                            <div className={cx('user-review')}>
                                <div className="user-name">{item.user.firstName} {item.user.lastName}</div>
                                <div className="user-rating">
                                    <Typography component="legend"></Typography>
                                    <Rating name="read-only" value={item.rating} readOnly />   
                                </div>
                            </div>
                            <div className="user-review">{item.content}</div>
                            </div>
                        </React.Fragment>
                    ))}
        </div>
            </div>
        </div>
        </>
    );
}

export default BookReview;