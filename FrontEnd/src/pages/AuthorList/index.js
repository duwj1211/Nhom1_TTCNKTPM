import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import classNames from "classnames/bind";
import styles from "./AuthorList.module.css";
import { Container, Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  async function fetchData() {
    try {
      const response = await ApiService.get("authors");
      if (response.status === 200) {
        setAuthors(response.data.authors);
        setCurrentPage(response.data.currentPage);
        setTotalPage(response.data.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className={cx("all-author")}>
      <div className={cx("all-author-nav")}>
        <Link className={cx("author-nav-home")} to="/">
          TRANG CHỦ
        </Link>
        <p>/</p>
        <div>TÁC GIẢ</div>
      </div>
      <div className={cx("author-list-title")}>Tác giả</div>
      <Container>
        <Row>
          <Col>
            <Row className={cx("author-list")}>
              {authors.map((author, index) => {
                return (
                  <div key={author._id} className="col-6 col-md-4">
                    <Link key={author._id} to={`/detail/${author.slug}`}>
                      <Author author={author} />
                    </Link>
                  </div>
                );
              })}
            </Row>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              paginate={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Author({ author }) {
  return (
    <div className={cx("author-item")}>
      <div className={cx("author-img")}>
        <img src={author.avatar} alt="Author-avatar" />
      </div>
      <div className={cx("author-name")}>{author.fullName}</div>
    </div>
  );
}

function Pagination({ currentPage, totalPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className={cx("pagination")}>
        {pageNumbers.map((number) => (
          <li key={number} className={cx("page-item")}>
            <button
              onClick={() => paginate(number)}
              className={cx("page-link")}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AuthorList;
