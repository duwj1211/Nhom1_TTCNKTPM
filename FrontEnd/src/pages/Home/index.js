import styles from "./Home.module.css";
import classNames from "classnames/bind";

import ApiService from "../../service/api.service";
import { useState, useEffect } from "react";
import TopBanner from "../../components/home/TopBanner";
import EBook from "../../components/home/EBook";
import NewReleaseBooks from "../../components/home/NewReleaseBooks";
import FeaturedBook from "../../components/home/FeaturedBook";
import Categories from "../../components/home/Categories";
import Sales from "../../components/home/Sales";

const cx = classNames.bind(styles);

export default function Home() {
  const [authors, setAuthors] = useState([]);

  async function getAuthors() {
    const response = await ApiService.get("authors");
    if (response.status === 200) {
      setAuthors(response.data.authors);
    }
  }

  useEffect(() => {
    // getAuthors();
  }, []);

  return (
    <div className={cx("wrap")}>
      <TopBanner />
      <Categories />
      <EBook />
      <NewReleaseBooks />
      <FeaturedBook />
      <Sales />
    </div>
  );
}
