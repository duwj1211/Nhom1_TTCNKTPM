import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api.service";
import classNames from "classnames/bind";
import styles from "./BookList.module.css";

const cx = classNames.bind(styles);

function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [pageOption, setPageOption] = useState("");
  const [booksPerPage, setBooksPerPage] = useState(9);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ApiService.get("books", {
          params: { limit: 15 },
        });
        if (response.status === 200) {
          setBooks(response.data.books);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleFilterAndSort = async (event) => {
    try {
      const minPriceInput = document.querySelector('input[name="minPrice"]');
      const maxPriceInput = document.querySelector('input[name="maxPrice"]');
      const nameInput = document.querySelector('input[name="name"]');

      const minPrice = minPriceInput.value;
      const maxPrice = maxPriceInput.value;
      const name = encodeURIComponent(nameInput.value);

      const sortOption = event.target.value;

      const params = {};

      if (minPrice && maxPrice) {
        params.search = `priceOriginal>=${minPrice}&priceOriginal<=${maxPrice}`;
      } else if (minPrice) {
        params.search = `priceOriginal>=${minPrice}`;
      } else if (maxPrice) {
        params.search = `priceOriginal<=${maxPrice}`;
      }

      if (name) {
        params.search += `${params.search ? "&" : ""}=${name}`;
      }

      if (selectedCategory) {
        params.search += `${
          params.search ? "&" : ""
        }category=${selectedCategory}`;
      }

      switch (sortOption) {
        case "alphabet":
          params.sortBy = "name";
          params.orderBy = "asc";
          break;
        case "price-asc":
          params.sortBy = "priceFinal";
          params.orderBy = "asc";

          break;
        case "price-desc":
          params.sortBy = "priceFinal";
          params.orderBy = "desc";

          break;
        case "new-book":
          params.sortBy = "createdAt";
          params.orderBy = "desc";
          break;
        case "bestseller-book":
          params.sortBy = "sold";
          params.orderBy = "desc";
          break;
        default:
          break;
      }

      const response = await ApiService.get("books", { params });

      if (response.status === 200) {
        setBooks(response.data.books);
      }

      minPriceInput.value = "";
      maxPriceInput.value = "";
      nameInput.value = "";
      setSelectedCategory("");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaging = async (event) => {
    try {
      const pageOption = event.target.value;

      switch (pageOption) {
        case "9books":
          setBooksPerPage(9);
          break;
        case "12books":
          setBooksPerPage(12);
          break;
        case "15books":
          setBooksPerPage(15);
          break;
        default:
          break;
      }

      const response = await ApiService.get("books");

      if (response.status === 200) {
        setBooks(response.data.books);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedBooks = chunkArray(currentBooks, 3);

  return (
    <div className={cx("all-book")}>
      <div className={cx("all-book-nav")}>
        <a className={cx("nav-home")} href="/">
          HOME
        </a>
        <p>/</p>
        <div>BOOKS</div>
      </div>
      <div className={cx("all-book-content")}>
        <Filter handleFilter={handleFilterAndSort} />
        <div className={cx("col-list-book")}>
          <div className={cx("sort-and-paging")}>
            <div className="sort">
              <select
                className={cx("sort-select")}
                onChange={handleFilterAndSort}
                value={sortOption}
              >
                <option value="alphabet">Sắp xếp theo tên A-Z</option>
                <option value="price-asc">Sắp xếp theo giá thấp - cao</option>
                <option value="price-desc">Sắp xếp theo giá cao - thấp</option>
                <option value="new-book">Sách mới</option>
                <option value="bestseller-book">Bán chạy</option>
              </select>
            </div>
            <div className={cx("paging")}>
              <select
                className={cx("paging-select")}
                onChange={handlePaging}
                value={pageOption}
              >
                <option value="9books">Hiển thị: 9 sách</option>
                <option value="12books">Hiển thị: 12 sách</option>
                <option value="15books">Hiển thị: 15 sách</option>
              </select>
            </div>
          </div>
          <div className={cx("book-list")}>
            {chunkedBooks.map((row, rowIndex) => (
              <div key={rowIndex} className={cx("book-row")}>
                {row.map((book) => (
                  <Link key={book._id} to={`/DetailBook/${book.slug}`}>
                    <Book book={book} />
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

function Filter({ handleFilter }) {
  const [isPriceCollapsed, setPriceCollapsed] = useState(true);
  const [isNameCollapsed, setNameCollapsed] = useState(true);
  const [isCategoryCollapsed, setCategoryCollapsed] = useState(true);
  const [isAuthorCollapsed, setAuthorCollapsed] = useState(true);
  const [isAvailabilityCollapsed, setAvailabilityCollapsed] = useState(true);

  const togglePrice = () => {
    setPriceCollapsed(!isPriceCollapsed);
  };
  const toggleName = () => {
    setNameCollapsed(!isNameCollapsed);
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
    <div className={cx("col-filter")}>
      <div className={cx("filter")}>
        <div className={cx("filter-item")}>
          <div className={cx("filter-type")}>
            Price{" "}
            <span className={cx("filter-toggle")} onClick={togglePrice}>
              {isPriceCollapsed ? "+" : "-"}
            </span>
          </div>
          {!isPriceCollapsed && (
            <div className={cx("wrap-input")}>
              <div className={cx("input")}>
                <div>$</div>
                <input type="number" name="minPrice" placeholder="Min price" />
                <div>to</div>
                <input type="number" name="maxPrice" placeholder="Max price" />
                <div>$</div>
              </div>
              <button onClick={handleFilter}>Filter</button>
            </div>
          )}
        </div>
        <hr />
        <div className={cx("filter-item")}>
          <div className={cx("filter-type")}>
            Name{" "}
            <span className={cx("filter-toggle")} onClick={toggleName}>
              {isNameCollapsed ? "+" : "-"}
            </span>
          </div>
          {!isNameCollapsed && (
            <div className={cx("wrap-input")}>
              <div className={cx("input")}>
                <input
                  className={cx("name-input")}
                  type="text"
                  name="name"
                  placeholder="Enter a name"
                />
              </div>
              <button onClick={handleFilter}>Filter</button>
            </div>
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

function Pagination({ booksPerPage, totalBooks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
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
