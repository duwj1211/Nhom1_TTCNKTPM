import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import classNames from "classnames/bind";
import styles from "./BookList.module.css";
import { useLocation, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookList() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [sortBy, setSortBy] = useState("sold");
  const [orderBy, setOrderBy] = useState("desc");
  const [category, setCategory] = useState("desc");
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q'));

  const listSort = [
    {title: 'Sắp xếp theo mặc định', sortBy: 'sold', orderBy: 'desc'},
    {title: 'Sắp xếp theo tên A-Z', sortBy: 'name', orderBy: 'asc'},
    {title: 'Sắp xếp theo tên Z-A', sortBy: 'name', orderBy: 'desc'},
    {title: 'Sắp xếp theo giá thấp - cao', sortBy: 'priceFinal', orderBy: 'asc'},
    {title: 'Sắp xếp theo giá cao - thấp', sortBy: 'priceFinal', orderBy: 'desc'},
    {title: 'Sách mới', sortBy: 'createdAt', orderBy: 'desc'},
  ]

  useEffect(() => {
    setSearchQuery(searchParams.get('q'))
  }, [location.search])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ApiService.get("books", {
          params: { 
            search: searchQuery,
            page: currentPage,
            limit: 12,
            sortBy: sortBy,
            orderBy: orderBy,
          },
        });
        if (response.status === 200) {
          setBooks(response.data.books);
          setCurrentPage(response.data.currentPage);
          setTotalPage(response.data.totalPages)
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [searchQuery, currentPage, sortBy, orderBy]);

  
  function handleSortChange(event) {
    const selectedSort = event.target.value;
    const [selectedSortBy, selectedOrderBy] = selectedSort.split(',');
    setSortBy(selectedSortBy);
    setOrderBy(selectedOrderBy);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className={cx("all-book")}>
      <div className={cx("all-book-nav")}>
        <a className={cx("nav-home")} href="/">
          HOME
        </a>
        <p>/</p>
        <div>BOOKS</div>
      </div>
      <div className="container py-4">
        <div className={cx("row")}>
          <div className={cx("col-0 col-md-3")}>
            <Filter />
          </div>
          <div className={cx("col-12 col-md-9")}>
            <div className={cx("sort-and-paging")}>
              <div className="sort">
                <select className={cx('sort-select')} value={`${sortBy},${orderBy}`} onChange={handleSortChange}>
                  {listSort.map((sortOption, index) => (
                    <option key={index} value={`${sortOption.sortBy},${sortOption.orderBy}`}>
                      {sortOption.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={cx("book-list")}>
              <div className={cx('row')}>
                {books.map((book, index) => {
                  return (
                    <div key={book._id} className={cx('col-6 col-md-4')}>
                      <Link key={book._id} to={`/DetailBook/${book.slug}`}>
                        <Book book={book} />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              paginate={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Filter({ handleFilter }) {
  const [isPriceCollapsed, setPriceCollapsed] = useState(false);
  const [isCategoryCollapsed, setCategoryCollapsed] = useState(true);
  const [isAuthorCollapsed, setAuthorCollapsed] = useState(true);
  const [isAvailabilityCollapsed, setAvailabilityCollapsed] = useState(true);

  const togglePrice = () => {
    setPriceCollapsed(!isPriceCollapsed);
  };
  const toggleCategory = () => {
    setCategoryCollapsed(!isCategoryCollapsed);
  };
  const toggleAuthor = () => {
    setAuthorCollapsed(!isAuthorCollapsed);
  };
  const toggleAvailability = () => {
    setAvailabilityCollapsed(!isAvailabilityCollapsed);
  };

  return (
    <div className={cx("filter")}>
      <div className={cx("filter-item")}>
        <div className={cx("filter-type")} onClick={togglePrice}>
          Giá
          <span className={cx("filter-toggle")}>
            {isPriceCollapsed ? "+" : "-"}
          </span>
        </div>
        {!isPriceCollapsed && (
          <>
            <div className={cx("input")}>
              <input type="number" name="minPrice" />
              <div>-</div>
              <input type="number" name="maxPrice"/>
            </div>
            <button onClick={handleFilter}>Filter</button>
          </>
        )}
      </div>
      <hr />
      <div className={cx("filter-item")}>
        <div className={cx("filter-type")}>
          Category{" "}
          <span className={cx("filter-toggle")} onClick={toggleCategory}>
            {isCategoryCollapsed ? "+" : "-"}
          </span>
        </div>
        {!isCategoryCollapsed && (
          <div className={cx("wrap-select")}>
            <div className={cx("select")}>
              <select>
                <option value="">All</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
              </select>
            </div>
            <button onClick={handleFilter}>Filter</button>
          </div>
        )}
      </div>
      <hr />
      <div className={cx("filter-item")}>
        <div className={cx("filter-type")}>
          Author{" "}
          <span className={cx("filter-toggle")} onClick={toggleAuthor}>
            {isAuthorCollapsed ? "+" : "-"}
          </span>
        </div>
        {!isAuthorCollapsed && (
          <div className={cx("wrap-select")}>
            <div className={cx("select")}>
              <select>
                <option value="">All</option>
                <option value="Author 1">Author 1</option>
                <option value="Author 2">Author 2</option>
                <option value="Author 3">Author 3</option>
              </select>
            </div>
            <button onClick={handleFilter}>Filter</button>
          </div>
        )}
      </div>
      <hr />
      <div className={cx("filter-item")}>
        <div className={cx("filter-type")}>
          Availability{" "}
          <span className={cx("filter-toggle")} onClick={toggleAvailability}>
            {isAvailabilityCollapsed ? "+" : "-"}
          </span>
        </div>
        {!isAvailabilityCollapsed && (
          <div className={cx("wrap-input")}>
            <div className={cx("input")}>
              <input
                className={cx("availability-input")}
                type="number"
                name="availability"
                placeholder="Enter a number"
              />
            </div>
            <button onClick={handleFilter}>Filter</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Book({ book }) {
  return (
    <div className={cx("wrap-book-item")}>
      <div className={cx("book-item")}>
        <div className={cx("item-img")}>
          <img src={book.avatar} alt="Book-item" />
        </div>
        <div className={cx("item-content")}>
          <h4>{book.name}</h4>
          <h5>{book.publisher}</h5>
          <h6>{(book.priceOriginal / 1000).toFixed(3)} VNĐ</h6>
        </div>
      </div>
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

export default BookList;
