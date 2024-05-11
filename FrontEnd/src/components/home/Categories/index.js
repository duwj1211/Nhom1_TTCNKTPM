import classNames from "classnames/bind";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);

function Categories() {
  return (
    <div className={cx("wrap-categories")}>
      <div className={cx("categories")}>
        <div className={cx("categories-title")}>
          <Row>
            <Col md={6}>
              <div className={cx("title")}>
                <p>Danh mục</p>
                <h3>Khám phá những thể lại sách hay nhất</h3>
              </div>
            </Col>
          </Row>
        </div>
        <div className={cx("categories-content")}>
          <Row>
            <Col md={4}>
              <Link to="category/van-hoc-kinh-dien" className={cx("content")}>
                <img
                  src={require("../../../assets/images/categories1.png")}
                  alt=""
                ></img>
                <h3>Văn học kinh điển</h3>
                <p>
                Thể loại "Văn học kinh điển" chính là kho báu vô giá, nơi chứa đựng những tác phẩm lớn đã làm lay động trái tim và khơi gợi trí tưởng tượng của bao thế hệ độc giả. Những cuốn sách này không chỉ là sản phẩm của nghệ thuật viết lách siêu phàm, mà từng trang giấy còn vang vọng hồn cốt của văn minh nhân loại, phản chiếu đa chiều từ bóng tối tới ánh sáng của xã hội qua từng kỷ nguyên.
                </p>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="category/tam-ly-hoc" className={cx("content")}>
                <img
                  src={require("../../../assets/images/categories2.png")}
                  alt=""
                ></img>
                <h3>Tâm lý học</h3>
                <p>
                Thể loại "Tâm lý học" quy tụ những cuốn sách mang đến cánh cửa hiểu biết sâu sắc về bản chất con người, niềm vui và nỗi buồn, động cơ và hành vi. Mỗi trang sách là một chuyến viễn du đến tâm hồn, thông qua các nghiên cứu, lý thuyết và ứng dụng thực tiễn, giúp bạn tự khám phá, phát triển bản thân và hiểu được những người xung quanh mình.
                </p>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="category/khoa-hoc-vien-tuong" className={cx("content")}>
                <img
                  src={require("../../../assets/images/khoa-hoc-vien-tuong.webp")}
                  alt=""
                ></img>
                <h3>Khoa học viễn tưởng</h3>
                <p>
                Thể loại "Khoa học viễn tưởng" mở ra một thế giới nơi sức mạnh của trí tưởng tượng con người được thể hiện một cách vô tận. Nơi giới hạn giữa thực tại và tưởng tượng bị xóa nhòa, và bạn được thư giãn cùng những chuyến phiêu lưu kỳ ảo xuyên qua không gian và thời gian, khám phá các hành tinh kỳ bí. Cuộn tròn trên ghế sofa và chuẩn bị cho một hành trình đầy phấn khích đang chờ đợi bạn!
                </p>
              </Link>
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
