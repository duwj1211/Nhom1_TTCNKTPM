import React, { useState, useEffect } from "react";
import ApiService from "../../../service/api.service";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./CarouselComponent.module.css";

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
  };

  return (
    <Slider {...settings} className={cx("slider")}>
      {books.map((book) => (
        <div key={book._id} className={cx("wrap-book-item")}>
          <div className={cx("book-item")}>
            <div className={cx("item-img")}>
              <img src={book.avatar} alt="Book item"></img>
            </div>
            <div className={cx("item-content")}>
              <h4>{book.name}</h4>
              <h5>{book.publisher}</h5>
              <h6>{book.priceOriginal / 1000}.000 VNĐ</h6>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselComponent;
