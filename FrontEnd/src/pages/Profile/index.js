import classNames from 'classnames/bind';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import ApiService from "../../service/api.service";
import {useNavigate} from "react-router-dom"

const cx = classNames.bind(styles);

export default function Profile() {
  let navigate = useNavigate();
  const [info, setInfo] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  const [dialogContent, setDialogContent] = useState("")
  const [showDialog, setShowDialog] = useState(false);

  async function getInfo() {
    try {
      const res = await ApiService.get("users/info");
      if (res.status === 200) {
        setInfo(res.data.userInfo);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function updateInfo() {
    try {
      const res = await ApiService.post("users/update-info", {
        newInfo: info
      });
      if (res.status === 200) {
        setInfo(res.data.userInfo);
        setDialogContent("Cập nhật thông tin tài khoản thành công");
        setShowDialog(true);
        console.log(dialogContent);
        console.log(showDialog);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }

  async function changePassword() {
    try {
      setErrorMsg("");
      if (currentPass === "" || newPass === "") {
        setErrorMsg("Vui lòng nhập đầy đủ thông tin");
      } else {
        const res = await ApiService.post("users/change-password", {
          currentPassword: currentPass,
          newPassword: newPass
        });
        if (res.status === 200) {
          setInfo(res.data.userInfo);
          setDialogContent("Đổi mật khẩu thành công");
          setShowDialog(true);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      if (error.response && error.response.status === 403) {
        setErrorMsg(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <>
    <div className={cx('container', 'profile')}>
      <div className={cx('row')}>
        <div className={cx('col-12 col-lg-7')}>
          <h3 className={cx('title', 'mt-4 mb-3')}>Thông tin cá nhân</h3>
          <div className={cx('info-wrap')}>
            <label>Họ: </label>
            <input type='text' value={info.firstName} name='firstName' autoComplete='off' onChange={handleChange}/>
          </div>
          <div className={cx('info-wrap')}>
            <label>Tên: </label>
            <input type='text' value={info.lastName} name='lastName' autoComplete='off' onChange={handleChange}/>
          </div>
          <div className={cx('info-wrap')}>
            <label>Email: </label>
            <input type='text' value={info.email} name='email' autoComplete='new-password' onChange={handleChange}/>
          </div>
          <div className={cx('info-wrap')}>
            <label>Số điện thoại: </label>
            <input type='text' value={info.phoneNumber} name='phoneNumber' autoComplete='off' onChange={handleChange}/>
          </div>
          <button className={cx('update-btn')} onClick={updateInfo}>Cập nhật</button>
          <h4 className={cx('sub-titel', 'mb-3')}>Đổi mật khẩu</h4>
          <div className={cx('info-wrap')}>
            <label>Mật khẩu hiện tại: </label>
            <input type='password' autoComplete='new-password' onChange={(e) => setCurrentPass(e.target.value)} />
          </div>
          <div className={cx('info-wrap')}>
            <label>Mật khẩu mới: </label>
            <input type='password' autoComplete='off' onChange={(e) => setNewPass(e.target.value)} />
          </div>
          <div className={cx('err-message')}>
            { !!errorMsg && errorMsg}
          </div>
          <button className={cx('update-btn')} onClick={changePassword}>Đổi mật khẩu</button>
        </div>
      </div>
    </div>
    <div id="dialog" className={cx('dialog', { open: showDialog })}>
        <div className={cx('success')}>
            {dialogContent}
        </div>
        <button onClick={() => setShowDialog(false)} aria-label="close" className={cx('close')}>❌</button>
    </div>
    <div className={cx('overlay')}></div>
    </>
  )
}