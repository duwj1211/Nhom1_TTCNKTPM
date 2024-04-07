import classNames from "classnames/bind";
import styles from "./EBook.module.css";
import ebookImg from "./ebook.png";
const cx = classNames.bind(styles);

function EBook() {
  return (
    <div className={cx("ebook-wrap")}>
      <div className="container">
        <div className="row">
          <div className="col-7 px-0">
            <div className={cx("ebook-text")}>
              <h6>ebook</h6>
              <h3>
                Access, Read, Practice & Engage with Digital Content (eBook)
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                lacus ut magna velit eleifend. Amet, quis urna, a eu.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="col-5 px-0">
            <img className={cx("ebook-img")} src={ebookImg} alt="eBook-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EBook;
