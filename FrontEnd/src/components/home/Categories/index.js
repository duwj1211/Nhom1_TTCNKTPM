import classNames from "classnames/bind";
import styles from "./Categories.module.css";
import categories1 from "./categories1.png";
import categories2 from "./categories2.png";
import categories3 from "./categories3.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Categories() {
  return (
    <div className="container">
      <div className={cx("wrap-categories")}>
        <div className={cx("categories")}>
          <div className={cx("categories-title")}>
            <div className="row">
              <div className="col-6">
                <div className={cx("title")}>
                  <p>Categories</p>
                  <h3>Explore our Top Categories</h3>
                </div>
              </div>
              <div className="col-6">
                <div className={cx("text")}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                  lacus ut magna velit eleifend. Amet, quis urna, a eu.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                  feugiat amet, libero ipsum ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed eu feugiat amet, libero ipsum..
                </div>
              </div>
            </div>
          </div>
          <div className={cx("categories-content")}>
            <div className="row">
              <div className="col-4">
                <div className={cx("content")}>
                  <img src={categories1} alt=""></img>
                  <h3>Higher Education</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut mat,
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className={cx("content")}>
                  <img src={categories2} alt=""></img>
                  <h3>Management Books</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut mat,
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className={cx("content")}>
                  <img src={categories3} alt=""></img>
                  <h3>Engineering Books</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut mat,
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("button")}>
            <Link to="/" className={cx("link-btn")}>
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
