import classNames from 'classnames/bind';
import React, {useState} from 'react';
import styles from './StarRating.module.css'
// import { FaStar } from 'react-icons/fa';
// import { Rating } from 'react-simple-star-rating';

const cx = classNames.bind(styles)

function StarRating({ onRatingChange }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

    const handleRatingChange = (currentRating) => {
        setRating(currentRating);
        onRatingChange(currentRating);
    };

    return ( 
        <div className={cx('wrap')}>
            {[...Array(totalStars)].map((star, index) => {
                const currentRating = index + 1;

                return (
                <label key={index}>
                    <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                    />
                    <span
                    className={cx('star')}
                    style={{
                        color:
                        currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                    }}
                    onMouseEnter={() => handleRatingChange(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    >
                    &#9733;
                    </span>
                </label>
                );
            })}
        </div>
     );
}

export default StarRating;