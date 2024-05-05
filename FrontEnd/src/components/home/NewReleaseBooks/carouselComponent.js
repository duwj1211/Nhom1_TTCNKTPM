import React, { useState, useEffect } from "react";
import ApiService from "../../../service/api.service";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./CarouselComponent.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function CarouselComponent() {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className={cx("slider")}>
      {books.map((book) => (
        <div key={book._id} className={cx("wrap-book-item")}>
          <div className={cx("book-item")}>
            <Link to={`/detail/${book.slug}`} className={cx("item-img")}>
              <img src={book.avatar} alt="Book item"></img>
            </Link>
            <div className={cx("item-content")}>
              <Link to={`/detail/${book.slug}`}>{book.name}</Link>
              <h5>{book.publisher}</h5>
              <div className={cx("item-price")}>
                <h6 className={cx("final-price")}>
                  {(book.priceFinal / 1000).toFixed(3)} VNĐ
                </h6>
                <h6 className={cx("original-price")}>
                  {(book.priceOriginal / 1000).toFixed(3)} VNĐ
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselComponent;
