import classNames from "classnames/bind";
import styles from "./Home.module.css";

const cx = classNames.bind(styles)

export default function Home() {

  return (
    <div className={cx("wrap")}>
      Home
    </div>
  )
}