import classNames from 'classnames/bind';
import styles from './TopBanner.module.css';
import Slider from "react-slick";

import { useState, useRef } from "react";

const cx = classNames.bind(styles)

function TopBanner() {
  
  const [slideIndex, setSlideIndex] = useState(0);

  const  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dot: false,
    beforeChange: (current, next) => setSlideIndex(next),
    // afterChange: (current, next) => setSlideIndex(next),
  };
  const slides = [
    {
      title: "Nguyen Dung Tuan",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
      image: require('../../assets/images/top-banner.png')
    },
    {
      title: "Nguyen Dung Tuan",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo",
      image: require('../../assets/images/top-banner-2.png')
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
              <div className='container h-100'>
                <div className={cx('d-flex h-100')}>
                  <div className={cx('info')}>
                    <h2 className={cx('title')}>{slide.title}</h2>
                    <p className={cx('content')}>{slide.content}</p>
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
  )
}

export default TopBanner;