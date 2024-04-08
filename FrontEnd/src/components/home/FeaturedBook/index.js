import React, { useState, useEffect } from "react";
import ApiService from "../../../service/api.service";
import classNames from "classnames/bind";
import styles from "./FeaturedBook.module.css";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function FeaturedBook() {
  const [featuredBook, setFeaturedBook] = useState(null);

  useEffect(() => {
    async function fetchFeaturedBook() {
      try {
        const response = await ApiService.get("books");
        if (response.status === 200) {
          const books = response.data.books;
          const highestPriceBook = books.reduce((maxBook, currentBook) => {
            return currentBook.priceOriginal > maxBook.priceOriginal
              ? currentBook
              : maxBook;
          }, books[0]);
          setFeaturedBook(highestPriceBook);
        }
      } catch (error) {
        console.error("Error fetching featured book:", error);
      }
    }

    fetchFeaturedBook();
  }, []);

  return (
    <div>
      {featuredBook && (
        <div className="container">
          <div className={cx("wrap-featured-book")}>
            <div className="row">
              <div className="col-6">
                <div className={cx("wrap-featured-book-img")}>
                  <div className={cx("featured-book-img")}>
                    <img src={featuredBook.avatar} alt=""></img>
                  </div>
                </div>
              </div>
              <div className="col-6 px-0">
                <div className={cx("featured-book-content")}>
                  <h2>Featured Book</h2>
                  <hr></hr>
                  <h6>{featuredBook.publisher}</h6>
                  <h3>{featuredBook.name}</h3>
                  <p className={cx("description")}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac.
                  </p>
                  <p className={cx("price")}>
                    {featuredBook.priceOriginal / 1000}.000 VNĐ
                  </p>
                  <Link to="/" className={cx("link-btn")}>
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedBook;
