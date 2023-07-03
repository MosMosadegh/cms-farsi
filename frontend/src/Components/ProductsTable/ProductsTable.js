import React, {useState } from "react";

import DeleteModal from "../DeleteModal/DeleteModal";
import DetailModal from "../DetailModal/DetailModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ProductsTable.css";

export default function ProductsTable({ getAllProduct, allProduct }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  
  const [productID, setProductID] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const notifyDeleteProductToast = () => toast.error("محصول از دیتابیس پاک شد", {theme: 'colored'});
  const notifyUpdateProductToast = () => toast.success("محصول در دیتابیس ویرایش شد",{theme: "dark",});


  const deleteModalCancelAction = () => {
    console.log("مدال کنسل شد");
    setIsShowDeleteModal(false);
  };


  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد");
    console.log(productID);
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        notifyDeleteProductToast();
        getAllProduct();
      });
  };

  const closeDetailModal = () => {
    setIsShowDetailModal(false);
    console.log("مدال جزییات بسته شد");
  };

  const closeEditModal = () => {
    setIsShowEditModal(false);
    console.log("مدال ویرایش بسته شد");
  };

  const updateProductInfo = (event) => {
    event.preventDefault();

    const newupdatedObj = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    }

    fetch(`http://localhost:8000/api/products/${productID}`, {
  method: 'PUT',
  body: JSON.stringify(newupdatedObj),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    setIsShowEditModal(false);
    notifyUpdateProductToast()
    getAllProduct();
  });

    console.log("محصول ویرایش شد");
  };

  return (
    <>
      {allProduct.length ? (
        <table className="product-table">
          <thead>
            <tr className="product-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product) => (
              <tr key={product.id} className="product-table-tr">
                <td>
                  <img
                    src={product.img}
                    alt="لبتاب Acer"
                    className="product-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price.toLocaleString()} تومان</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setMainProductInfos(product);
                    }}
                  >
                    جزییات
                  </button>

                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductID(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <ToastContainer />

                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setProductID(product.id);
                      setProductID(product.id);
                      setIsShowEditModal(true);
                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewCount(product.count);
                      setProductNewImg(product.img);
                      setProductNewPopularity(product.popularity);
                      setProductNewSale(product.sale);
                      setProductNewColors(product.colors);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg=" هیچ محصولی یافت نشد" />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfos.popularity}%</td>
                <td>{mainProductInfos.sale.toLocaleString()} تومان</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateProductInfo}>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={productNewTitle}
              onChange={(e)=>{setProductNewTitle(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="مبلغ جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPrice.toLocaleString()}
              onChange={(e)=>{setProductNewPrice(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-product-input"
              value={productNewCount}
              onChange={(e)=>{setProductNewCount(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-product-input"
              value={productNewImg}
              onChange={(e)=>{setProductNewImg(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان محبوبیت جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPopularity}
              onChange={(e)=>{setProductNewPopularity(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={productNewSale.toLocaleString()}
              onChange={(e)=>{setProductNewSale(e.target.value)}}
            />
          </div>
          <div className="edit-product-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="تعداد رنگ جدید را وارد کنید"
              className="edit-product-input"
              value={productNewColors}
              onChange={(e)=>{setProductNewColors(e.target.value)}}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
