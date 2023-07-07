import React, { useEffect, useState } from 'react'
import ErrorBox from '../ErrorBox/ErrorBox'
import './Order.css'

export default function Order() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = () => {
    fetch("http://localhost:8000/api/orders/")
      .then((res) => res.json())
      .then((order) => setOrder(order));
  };
  console.log(order)

  return (
    <div className="csm-main">
      <h1 className="cms-title"> لیست سفارشات</h1>
      {order.length ? (
        <p>hi</p>
      ):(
        <ErrorBox msg=' هیچ سفارشی یافت نشد'/>
      )}
    </div>
  )
}
