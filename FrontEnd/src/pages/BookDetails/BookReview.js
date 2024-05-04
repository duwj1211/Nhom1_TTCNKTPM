import classNames from 'classnames/bind';
import React, {useState} from 'react';
import styles from './BookReviews.module.css';
import StarRating from './StarRating';

const cx = classNames.bind(styles);

function BookReview() {
    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [review, setReview] = useState({});

    return (  
        <div className={cx('wrap-review-form')}>
            <div className={cx('review-form')}>
                <div className={cx('comment-respond')}>
                    <span className={cx('comment-reply-title')}>
                    </span>
                    <form action='' className={cx('comment-form')}>
                        <p className={cx('comment-notes')}>
                            <span id='email-notes'>Your email address will not be published.&nbsp;</span> 
                            <span className={cx('required-field-message')}>Required fields are marked &nbsp;
                                <span className={cx('required')}>*</span>
                            </span>
                        </p>
                        <div className={cx('comment-form-rating')}>
                            <label for='rating'>Your rating&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <StarRating />
                        </div>
                        <p className={cx('comment-form-comment')}>
                            <label for='comment'>Your review&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <textarea autocomplete='new-password' className={cx('comment')} cols='45' rows='8' required></textarea>
                        </p>
                        <p className={cx('comment-form-author')}>
                            <label for='author'>Name&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <input id='author' name='author' type='text' size='30' required />
                        </p>
                        <p className={cx('comment-form-email')}>
                            <label for='email'>Email&nbsp;
                                <span className={cx('required')}>*</span>
                            </label>
                            <input id='email' name='email' type='email' size='30' required />
                        </p>
                        <p className={cx('comment-form-cookies-consent')}>
                            <input id='wp-comment-cookies-consent' name='wp-comment-cookies-consent' type='checkbox' value='yes' /> 
                            <label for='wp-comment-cookies-consent'>Save my name, email, and website in this browser for the next time I comment.</label>
                        </p>
                        <p className={cx('form-submit')}>
                            <input name='submit' type='submit' id='submit' className={cx('submit-btn')} value='Submit' /> 
                            <input type='hidden' name='comment_post_ID' value='577' id='comment_post_ID' />
                            <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookReview;