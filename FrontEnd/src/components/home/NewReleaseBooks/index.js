import classNames from "classnames/bind";
import styles from "./NewReleaseBooks.module.css";
import CarouselComponent from "./carouselComponent";

const cx = classNames.bind(styles);
function NewReleaseBooks() {
  return (
    <div className={cx("new-release-books")}>
      <div className={cx("small-title")}>SOME QUALITY ITEMS</div>
      <div className={cx("wrap-big-title")}>
        <hr></hr>
        <div className={cx("big-title")}>New Release Books</div>
        <hr></hr>
      </div>
      <CarouselComponent />
      <hr className={cx("hr")}></hr>
      <div className={cx("view-all-products")}>
        <p>View All Products</p>
        <i className="fa fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default NewReleaseBooks;
