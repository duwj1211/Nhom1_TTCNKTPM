import React from "react";
import classNames from "classnames/bind";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import styles from "./DeleteConfirm.module.css";
const cx = classNames.bind(styles);

const DeleteConfirm = ({ open, onClose, onConfirm, productName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          style={{ fontSize: "30px" }}
          className={cx("title-confirm")}
        >
          Xác nhận
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          style={{ fontSize: "20px" }}
          className={cx("content-confirm")}
        >
          Bạn có chắc chắn muốn xóa {productName} này khỏi giỏ hàng ?
        </Typography>
        <Typography className={cx("sub-content-confirm")}>
          Bạn không thể hoàn tác hành động này
        </Typography>
      </DialogContent>
      <DialogActions>
        <div className={cx("cancel-btn")}>
          <Button onClick={onClose}>Thoát</Button>
        </div>
        <div className={cx("confirm-btn")}>
          <Button onClick={onConfirm}>Đồng ý</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
