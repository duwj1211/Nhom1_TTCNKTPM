import React, { useState, useEffect } from "react";
import ApiService from "../../../service/api.service";
import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
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
        <div className={cx("wrap-featured-book")}>
          <Container>
            <Row>
              <Col md={6}>
                <div className={cx("wrap-featured-book-img")}>
                  <div className={cx("featured-book-img")}>
                    <img src={featuredBook.avatar} alt=""></img>
                  </div>
                </div>
              </Col>
              <Col md={6} className="px-0">
                <div className={cx("featured-book-content")}>
                  <h2>Featured Book</h2>
                  <hr></hr>
                  <h6>{featuredBook.publisher}</h6>
                  <h3>{featuredBook.name}</h3>
                  <div className={cx("description")}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac.
                  </div>
                  <div className={cx("item-price")}>
                    <h5 className={cx("final-price")}>
                      {(featuredBook.priceFinal / 1000).toFixed(3)} VNĐ
                    </h5>
                    <h5 className={cx("original-price")}>
                      {(featuredBook.priceOriginal / 1000).toFixed(3)} VNĐ
                    </h5>
                  </div>
                  <Link to="/" className={cx("link-btn")}>
                    Xem chi tiết
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default FeaturedBook;
