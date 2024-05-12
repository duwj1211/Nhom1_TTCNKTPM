import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import classNames from "classnames/bind";
import styles from "./BookList.module.css";
import { useLocation, useSearchParams, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function BookList() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { cate } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [sortBy, setSortBy] = useState("sold");
  const [orderBy, setOrderBy] = useState("desc");
  const [category, setCategory] = useState(cate ? cate : "");
  const [minPrice, setMinPrice] = useState(cate ? cate : "");
  const [maxPrice, setMaxPrice] = useState(cate ? cate : "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q"));

  const listSort = [
    { title: "Sắp xếp theo mặc định", sortBy: "sold", orderBy: "desc" },
    { title: "Sắp xếp theo tên A-Z", sortBy: "name", orderBy: "asc" },
    { title: "Sắp xếp theo tên Z-A", sortBy: "name", orderBy: "desc" },
    {
      title: "Sắp xếp theo giá thấp - cao",
      sortBy: "priceFinal",
      orderBy: "asc",
    },
    {
      title: "Sắp xếp theo giá cao - thấp",
      sortBy: "priceFinal",
      orderBy: "desc",
    },
    { title: "Sách mới", sortBy: "createdAt", orderBy: "desc" },
  ];

  useEffect(() => {
    setSearchQuery(searchParams.get("q"));
  }, [location.search, searchParams]);

  useEffect(() => {
    setCategory(cate);
  }, [cate])

  async function fetchData() {
    try {
      const response = await ApiService.get("books", {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: 12,
          sortBy: sortBy,
          orderBy: orderBy,
          category: category,
          minPrice: minPrice,
          maxPrice: maxPrice
        },
      });
      if (response.status === 200) {
        setBooks(response.data.books);
        setCurrentPage(response.data.currentPage);
        setTotalPage(response.data.totalPages);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage, sortBy, orderBy, category]);

  function handleSortChange(event) {
    const selectedSort = event.target.value;
    const [selectedSortBy, selectedOrderBy] = selectedSort.split(",");
    setSortBy(selectedSortBy);
    setOrderBy(selectedOrderBy);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleChangePrice(e) {
    const {name, value} = e.target;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
    }
  }
  function filterPrice() {
    fetchData();
  }

  return (
    <div className={cx("all-book")}>
      <div className={cx("all-book-nav")}>
        <Link className={cx("nav-home")} to="/">
          HOME
        </Link>
        <p>/</p>
        <div>BOOKS</div>
      </div>
      <div className="container py-4">
        <div className={cx("row")}>
          <div className={cx("col-0 col-md-3")}>
            <Filter handleChangePrice={handleChangePrice} handleFilter={filterPrice}/>
          </div>
          <div className={cx("col-12 col-md-9")}>
            <div className={cx("sort-and-paging")}>
              <div className="sort">
                <select
                  className={cx("sort-select")}
                  value={`${sortBy},${orderBy}`}
                  onChange={handleSortChange}
                >
                  {listSort.map((sortOption, index) => (
                    <option
                      key={index}
                      value={`${sortOption.sortBy},${sortOption.orderBy}`}
                    >
                      {sortOption.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={cx("book-list")}>
              <div className={cx("row")}>
                {books.map((book, index) => {
                  return (
                    <div key={book._id} className={cx("col-6 col-md-4")}>
                      <Link key={book._id} to={`/detail/${book.slug}`}>
                        <Book book={book} />
                      </Link>
                    </div>
                  );
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

function Filter({ handleFilter, handleChangePrice }) {
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
              <input type="number" name="minPrice" onChange={handleChangePrice}/>
              <div>-</div>
              <input type="number" name="maxPrice" onChange={handleChangePrice}/>
            </div>
            <button onClick={handleFilter}>Lọc</button>
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
