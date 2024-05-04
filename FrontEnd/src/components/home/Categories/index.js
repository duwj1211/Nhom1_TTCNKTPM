import classNames from "classnames/bind";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);

function Categories() {
  return (
    <div className={cx("wrap-categories")}>
      <div className={cx("categories")}>
        <div className={cx("categories-title")}>
          <Row>
            <Col md={6}>
              <div className={cx("title")}>
                <p>Categories</p>
                <h3>Explore our Top Categories</h3>
              </div>
            </Col>
            <Col md={6}>
              <div className={cx("text")}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                lacus ut magna velit eleifend. Amet, quis urna, a eu.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed eu feugiat
                amet, libero ipsum ipsum dolor sit amet, consectetur adipiscing
                elit. Sed eu feugiat amet, libero ipsum..
              </div>
            </Col>
          </Row>
        </div>
        <div className={cx("categories-content")}>
          <Row>
            <Col md={4}>
              <div className={cx("content")}>
                <img
                  src={require("../../../assets/images/categories1.png")}
                  alt=""
                ></img>
                <h3>Higher Education</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                  lacus ut mat,
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={cx("content")}>
                <img
                  src={require("../../../assets/images/categories2.png")}
                  alt=""
                ></img>
                <h3>Management Books</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                  lacus ut mat,
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={cx("content")}>
                <img
                  src={require("../../../assets/images/categories3.png")}
                  alt=""
                ></img>
                <h3>Engineering Books</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                  lacus ut mat,
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className={cx("button")}>
          <Link to="/" className={cx("link-btn")}>
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
