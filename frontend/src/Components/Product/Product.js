import React, { useEffect, useState } from 'react'

import AddNewProduct from '../AddNewProduct/AddNewProduct'
import './Product.css'
import ProductsTable from '../ProductsTable/ProductsTable'

export default function Product() {

  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((product) => setAllProduct(product.reverse()));
  };

  return (
    <div className='container-fluid'>
    <AddNewProduct getAllProduct={getAllProduct} />
    
    <ProductsTable allProduct={allProduct} getAllProduct={getAllProduct}/>
    </div>
  )
}
