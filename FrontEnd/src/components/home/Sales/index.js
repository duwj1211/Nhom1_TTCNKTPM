import classNames from 'classnames/bind';
import styles from './Sales.module.css';
import Slider from "react-slick";

import { useState, useRef } from "react";


const cx = classNames.bind(styles)

function Sales() {
    
    const [slideIndex, setSlideIndex] = useState(0);

    const  settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        beforeChange: (current, next) => setSlideIndex(next),
        // afterChange: (current, next) => setSlideIndex(next),
    };

    const slides = [
        {
            title: "All books are 50% off now! Don't miss such a deal!",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
            days: "32",
            hours: "02",
            minutes: "27",
            seconds: "55",
            image: require('../../../assets/images/img_unsplash.png')
        },
        {
            title: "All books are 50% off now! Don't miss such a deal!",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
            days: "32",
            hours: "02",
            minutes: "27",
            seconds: "55",
            image: require('../../../assets/images/img_unsplash.png')
        },
    ]

    let sliderRef = useRef(null)
    function changeSlide(index) {
        sliderRef.slickGoTo(index);
        setSlideIndex(index)
    }

    return ( 
        <div className={cx('wrap')}>
            <Slider {...settings} ref={slider => (sliderRef = slider)}>
                {slides.map((slide, index) => {
                    return (
                        <div key={index} className={cx('slide-item')}>
                            <div className={cx('slide')}>
                                <div className={cx('row')}>
                                    <div className={cx('column')}>
                                        <h2 className={cx('title')}>{slide.title}</h2>
                                        <p className={cx('description')}>{slide.description}</p>
                                        <div className={cx('timer-container')}>
                                            <ul>
                                                <li>
                                                    <span className={cx('days')}>{slide.days}</span> Days
                                                </li>
                                                <li>
                                                    <span className={cx('hours')}>{slide.hours}</span> Hour
                                                </li>
                                                <li>
                                                    <span className={cx('minutes')}>{slide.minutes}</span> Mint
                                                </li>
                                                <li>
                                                    <span className={cx('seconds')}>{slide.seconds}</span> Sec
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={cx('slick-dots')}>
                                            {slides.map((slide, index) => {
                                                return (
                                                <span key={index} className={cx('dot-item', index==slideIndex ? 'dot-item--active': '')}
                                                    onClick={() => changeSlide(index)}
                                                >
                                                </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('image')}>
                                            <img src={slide.image} alt={slide.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>    
    );
}

export default Sales;