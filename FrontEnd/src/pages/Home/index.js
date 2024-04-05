import classNames from "classnames/bind";
import styles from "./Home.module.css";

import ApiService from "../../service/api.service";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles)

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
      Home
    </div>
  )
}