import classNames from 'classnames/bind';
import styles from './TopBanner.module.css';
import Slider from "react-slick";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function TopBanner() {
  
  const [slideIndex, setSlideIndex] = useState(0);

  const  settings = {
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
      title: "Sách bán chạy nhất",
      content: "Khám phá những tựa sách bán chạy nhất trên thị trường! Từ tiểu thuyết hấp dẫn đến sách tự học, chúng tôi tự hào giới thiệu bộ sưu tập đa dạng để đáp ứng mọi sở thích và nhu cầu đọc sách của bạn.",
      image: require('../../../assets/images/top-banner.png')
    },
    {
      title: "The Assignment",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo",
      image: require('../../../assets/images/top-banner-2.png')
    },
    {
      title: "Sách mới phát hành",
      content: "Khám phá sự mới mẻ với những cuốn sách mới phát hành! Tận hưởng hành trình phiêu lưu qua các trang sách mới nhất từ các tác giả tài năng và đa dạng thể loại",
      image: require('../../../assets/images/top-banner-3.png')
    },
    {
      title: "Sách triết học",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo",
      image: require('../../../assets/images/top-banner-4.png')
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
                    <Link to='/' className={cx('link-btn')}>Tìm hiểu thêm</Link>
                    <div className={cx('slick-dots')}>
                      {slides.map((slide, index) => {
                        return (
                          <span key={index} className={cx('dot-item', index===slideIndex ? 'dot-item--active': '')}
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