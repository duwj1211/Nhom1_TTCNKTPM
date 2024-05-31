import styles from "./Home.module.css";
import classNames from "classnames/bind";

import TopBanner from "../../components/home/TopBanner";
import EBook from "../../components/home/EBook";
import NewReleaseBooks from "../../components/home/NewReleaseBooks";
import FeaturedBook from "../../components/home/FeaturedBook";
import Categories from "../../components/home/Categories";
import Sales from "../../components/home/Sales";

const cx = classNames.bind(styles);

export default function Home() {

  return (
    <div className={cx("wrap")}>
      <TopBanner />
      <Categories />
      <NewReleaseBooks />
      <FeaturedBook />
      <EBook />
      <Sales />
    </div>
  );
}
