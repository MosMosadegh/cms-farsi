import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Users.css";
import EditModal from "../EditModal/EditModal";
import DetailModal from "../DetailModal/DetailModal";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [userID, SetUserID] = useState(null);
  const [isShowDeleteModal, SetIsShowDeleteModal] = useState(false);
  const [isShowEditModal, SetIsShowEditModal] = useState(false);
  const [isShowDetailModal, SetIsShowDetailModal] = useState(false);
  const [mainUsersInfo, setMainUsersInfo ] = useState(false);


  const [userNewFirstName, setUserNewFirstName] = useState("");
  const [userNewLastName, setUserNewLastName] = useState("");
  const [userNewUserName, setUserNewUserName] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewScore, setUserNewScore] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    fetch("http://localhost:8000/api/users/")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  };

  // Start Close Function //
  const closeDetailModal = () => {
    SetIsShowDetailModal(false);
  };
  const closeDeleteModal = () => {
    SetIsShowDeleteModal(false);
  };
  const closeEditModal = () => {
    SetIsShowEditModal(false);
  };
  // Finish Close Function //

  // Start Toast Function //
  const notifyDeleteUserToast = () =>
    toast.error("کاربر از دیتابیس پاک شد", { theme: "colored" });

  const notifyEditUserToast = () =>
    toast.success("کاربر در دیتابیس ویرایش شد", { theme: "colored" });
  //Finish  Toast Function //

  // Start SubmitAction Function //
  const deleteUserSubmitAction = () => {
    console.log("«کاربر پاک شد");
    console.log(`UserId:${userID}`);
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        SetIsShowDeleteModal(false);
        notifyDeleteUserToast();
        getAllUser();
      });
  };

  const editUserSubmitAction = (event) => {
    event.preventDefault();
    console.log("کاربر ویرایش شد");
    console.log(userID);

    const newUpdateUserObj = {
      firsname: userNewFirstName,
      lastname: userNewLastName,
      username: userNewUserName,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };
    console.log(newUpdateUserObj);

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      body: JSON.stringify(newUpdateUserObj),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        SetIsShowEditModal(false);
        notifyEditUserToast();
        getAllUser();
      });
  };
  // Finish SubmitAction Function //

  return (
    <div className="csm-main">
      <h1 className="cms-title"> لیست کاربران</h1>
      {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <td>نام نام خانوادکی</td>
              <td>یوزرنیم</td>
              <td>رمز عبور</td>
              <td>شماره تماس</td>
              <td>ایمیل</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>
                  {user.firsname} {user.lastname}
                </th>
                <th>{user.username}</th>
                <th>{user.password}</th>
                <th>{user.phone}</th>
                <th>{user.email}</th>
                <th>
                  <button
                    onClick={() => {
                      SetUserID(user.id);
                      SetIsShowDeleteModal(true);
                    }}
                  >
                    حذف
                  </button>
                </th>
                <th>
                  <button
                  onClick={()=>{
                    setMainUsersInfo(user)
                    SetIsShowDetailModal(true)
                  }}
                  >جرییات</button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      SetUserID(user.id);
                      SetIsShowEditModal(true);
                      setUserNewFirstName(user.firsname);
                      setUserNewLastName(user.lastname);
                      setUserNewUserName(user.username);
                      setUserNewPassword(user.password);
                      setUserNewPhone(user.phone);
                      setUserNewCity(user.city);
                      setUserNewEmail(user.email);
                      setUserNewAddress(user.address);
                      setUserNewScore(user.score);
                      setUserNewBuy(user.buy);
                    }}
                  >
                    ویرایش
                  </button>
                </th>
                <th></th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg=" هیچ کاربری یافت نشد" />
      )}
      <ToastContainer />
      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف اطمینان دارید؟"}
          submitAction={deleteUserSubmitAction}
          cancelAction={closeDeleteModal}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={editUserSubmitAction}>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewFirstName}
              onChange={(e) => {
                setUserNewFirstName(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewLastName}
              onChange={(e) => {
                setUserNewLastName(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewUserName}
              onChange={(e) => {
                setUserNewUserName(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPassword}
              onChange={(e) => {
                setUserNewPassword(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPhone}
              onChange={(e) => {
                setUserNewPhone(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewCity}
              onChange={(e) => {
                setUserNewCity(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewEmail}
              onChange={(e) => {
                setUserNewEmail(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <textarea
              className="edit-user-info-input"
              value={userNewAddress}
              onChange={(e) => {
                setUserNewAddress(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewScore}
              onChange={(e) => {
                setUserNewScore(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewBuy}
              onChange={(e) => {
                setUserNewBuy(e.target.value);
              }}
              placeholder="مقدار جدید را وارد کنید"
            />
          </div>
        </EditModal>
      )}
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <td>شهر</td>
                <td>آدرس</td>
                <td>امتیاز</td>
                <td>میزان خرید</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainUsersInfo.city}</td>
                <td>{mainUsersInfo.address}</td>
                <td>{mainUsersInfo.score}</td>
                <td>{mainUsersInfo.buy.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <button className="text-modal-close-btn" onClick={closeDetailModal}>
            بستن
          </button>
        </DetailModal>
      )}
    </div>
  );
}
