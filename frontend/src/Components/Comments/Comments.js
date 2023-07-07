import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailModal from "../DetailModal/DetailModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Comments.css";
import EditModal from "../EditModal/EditModal";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailModal, SetIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, SetIsShowDeleteModal] = useState(false);
  const [isShowEditModal, SetIsShowEditModal] = useState(false);
  const [isShowAcceptModal, SetIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, SetIsShowRejectModal] = useState(false);
  const [commentID, SetCommentID] = useState(null);
  const [mainCommentsBody, SetMainCommentsBody] = useState("");

  useEffect(() => {
    getAllComment();
  }, []);

  const getAllComment = () => {
    fetch("http://localhost:8000/api/comments/")
      .then((res) => res.json())
      .then((comments) => setAllComments(comments));
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
  const closeAcceptModal = () => {
    SetIsShowAcceptModal(false);
  };
  const closeRejectModal = () => {
    SetIsShowRejectModal(false);
  };
  // Finish Close Function //

  // Start Toast Function //
  const notifyDeleteCommentToast = () =>
    toast.error("کامنت از دیتابیس پاک شد", { theme: "colored" });

  const notifyEditCommentToast = () =>
    toast.success("کامنت در دیتابیس ویرایش شد", { theme: "colored" });
  //Finish  Toast Function //

  // Start SubmitAction Function //
  const deleteCommentSubmitAction = () => {
    console.log("کامنت پاک شد");
    console.log(commentID);
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        SetIsShowDeleteModal(false);
        notifyDeleteCommentToast();
        getAllComment();
      });
  };

  const editCommentSubmitAction = (event) => {
    event.preventDefault();
    console.log("کامنت ویرایش شد");
    console.log(commentID);
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      body: JSON.stringify({
        body: mainCommentsBody,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        SetIsShowEditModal(false);
        notifyEditCommentToast();
        getAllComment();
      });
  };

  const acceptCommentSubmitAction = (event) => {
    event.preventDefault();
    console.log("کامنت تایید شد");
    console.log(commentID);
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        SetIsShowAcceptModal(false);
        getAllComment();
      });
  };

  const rejectCommentSubmitAction = (event) => {
    event.preventDefault();
    console.log("کامنت رد شد");
    console.log(commentID);
    fetch(`http://localhost:8000/api/comments//reject/${commentID}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        SetIsShowRejectModal(false);
        getAllComment();
      });
  };
  // Finish SubmitAction Function //

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنتها</h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ ثبت</th>
              <th>ساعت ثبت</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      SetMainCommentsBody(comment.body);
                      SetIsShowDetailModal(true);
                    }}
                  >
                    دیدن کامنت
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      SetCommentID(comment.id);
                      SetIsShowDeleteModal(true);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      SetCommentID(comment.id);
                      SetIsShowEditModal(true);
                      SetMainCommentsBody(comment.body);
                    }}
                  >
                    ویرایش
                  </button>
                  <button>پاسخ</button>
                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        SetCommentID(comment.id);
                        SetIsShowAcceptModal(true);
                      }}
                    >
                      تایید
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        SetCommentID(comment.id);
                        SetIsShowRejectModal(true);
                      }}
                    >
                      رد کامنت
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg=" هیچ کامنتی یافت نشد" />
      )}
      <ToastContainer />
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <p className="text-modal">{mainCommentsBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailModal}>
            بستن
          </button>
        </DetailModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف اطمینان دارید؟"}
          submitAction={deleteCommentSubmitAction}
          cancelAction={closeDeleteModal}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={editCommentSubmitAction}>
          <textarea
            value={mainCommentsBody}
            onChange={(e) => {
              SetMainCommentsBody(e.target.value);
            }}
            cols="30"
            rows="10"
          ></textarea>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          title={"آیا از تایید خود اطمینان دارید"}
          submitAction={acceptCommentSubmitAction}
          cancelAction={closeAcceptModal}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          title={"آیا از رد کامنت اطمینان دارید"}
          submitAction={rejectCommentSubmitAction}
          cancelAction={closeRejectModal}
        />
      )}
    </div>
  );
}
