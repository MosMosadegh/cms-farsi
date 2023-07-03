import React, { useState } from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";
import { VscSymbolColor } from "react-icons/vsc";
import { BsBag, BsFillBarChartLineFill } from "react-icons/bs";
import { AiOutlinePicture, AiOutlineStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddNewProduct.css";
export default function AddNewProduct({ getAllProduct }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const notifyAddProductToast = () => toast.success("محصول جدید به دیتابیس اضافه شد", {theme: "colored",})

  const newProductObj = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
    productDesc: newProductDesc,
  };

  const addNewProduct = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:8000/api/products', {
  method: 'POST',
  body: JSON.stringify(newProductObj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    notifyAddProductToast()
    getAllProduct()
    emptyInput()
  })
  };

  function emptyInput () {
    setNewProductTitle('')
    setNewProductPrice('')
    setNewProductCount('')
    setNewProductImg('')
    setNewProductPopularity('')
    setNewProductSale('')
    setNewProductColors('')
    setNewProductDesc('')
  }

  return (
    <div className="products-main">
      <h1 className="products-title">افزودن محصول جدید</h1>
      <form action="#" className="add-products-form">
        <div className="add-products-form-wrap">
          <div className="add-products-group">
            <RiProductHuntLine className="add-product-icon" />
            <input
              type="text"
              placeholder="اسم محصول را بنویسید"
              className="add-products-input"
              value={newProductTitle}
              onChange={(e) => {
                setNewProductTitle(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <BiDollar className="add-product-icon" />
            <input
              type="text"
              placeholder="قیمت محصول را بنویسید"
              className="add-products-input"
              value={newProductPrice}
              onChange={(e) => {
                setNewProductPrice(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <BsBag className="add-product-icon" />
            <input
              type="text"
              placeholder="موجودی محصول را بنویسید"
              className="add-products-input"
              value={newProductCount}
              onChange={(e) => {
                setNewProductCount(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <AiOutlinePicture className="add-product-icon" />
            <input
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              className="add-products-input"
              value={newProductImg}
              onChange={(e) => {
                setNewProductImg(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <AiOutlineStar className="add-product-icon" />
            <input
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              className="add-products-input"
              value={newProductPopularity}
              onChange={(e) => {
                setNewProductPopularity(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <BsFillBarChartLineFill className="add-product-icon" />
            <input
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              className="add-products-input"
              value={newProductSale}
              onChange={(e) => {
                setNewProductSale(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <VscSymbolColor className="add-product-icon" />
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              className="add-products-input"
              value={newProductColors}
              onChange={(e) => {
                setNewProductColors(e.target.value);
              }}
            />
          </div>
          <div className="add-products-group">
            <VscSymbolColor className="add-product-icon" />
            <input
              type="text"
              placeholder=" توضیحات  محصول را بنویسید"
              className="add-products-input"
              value={newProductDesc}
              onChange={(e) => {
                setNewProductDesc(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="add-products-submit" onClick={addNewProduct}>
          ثبت محصول
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
