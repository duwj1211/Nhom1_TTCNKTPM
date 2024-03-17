import classNames from "classnames/bind";
import styles from './DefaultLayout.module.css';
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('page')}>
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
