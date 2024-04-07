import React, { useState, useEffect } from "react";
import ApiService from "../../../service/api.service";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./CarouselComponent.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);

function CarouselComponent() {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    const response = await ApiService.get("books");
    console.log(response.data);
    if (response.status === 200) {
      setBooks(response.data.books);
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
        <div key={book.id} className={cx("book-item")}>
          <div className={cx("item-img")}>
            <img src={book.avatar} alt="Book item"></img>
          </div>
          <div className={cx("item-content")}>
            <h4>{book.name}</h4>
            <h5>{book.publisher}</h5>
            <h6>{book.priceOriginal / 1000}.000 VNĐ</h6>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselComponent;
