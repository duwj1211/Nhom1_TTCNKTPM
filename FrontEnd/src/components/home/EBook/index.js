import classNames from "classnames/bind";
import styles from "./EBook.module.css";
import { Container, Row, Col } from "react-bootstrap";
const cx = classNames.bind(styles);

function EBook() {
  return (
    <div className={cx("ebook-wrap")}>
      <Container>
        <Row>
          <Col md={7}>
            <div className={cx("ebook-text")}>
              <h6>OneBook</h6>
              <h3>
                Kho sách tri thức với đầy đủ thể loại cho độc giả
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
                ut magna velit eleifend. Amet, quis urna, a eu.Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </Col>
          <Col md={5}>
            <img
              className={cx("ebook-img")}
              src={require("../../../assets/images/ebook.png")}
              alt="eBook-img"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EBook;
