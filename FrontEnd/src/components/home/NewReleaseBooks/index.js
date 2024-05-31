import classNames from "classnames/bind";
import styles from "./NewReleaseBooks.module.css";
import CarouselComponent from "./carouselComponent";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function NewReleaseBooks() {
  return (
    <div className={cx("new-release-books")}>
      {/* <div className={cx("small-title")}>SOME QUALITY ITEMS</div> */}
      <div className={cx("wrap-big-title")}>
        <hr></hr>
        <div className={cx("big-title")}>SÁCH MỚI PHÁT HÀNH</div>
        <hr></hr>
      </div>
      <CarouselComponent />
      <hr className={cx("hr")}></hr>
      <div className={cx("view-all-products")}>
        <Link to="books">Xem tất cả</Link>
        <i className="fa fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default NewReleaseBooks;
