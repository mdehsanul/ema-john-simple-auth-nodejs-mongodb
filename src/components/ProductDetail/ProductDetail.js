import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  // destructuring
  const { productKey } = useParams();

  // Read from MongoDB
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  // when API need to use useEffect()
  // const selectdProduct = fakeData.find((product) => product.key === productKey);
  const selectdProduct = product.find((product) => product.key === productKey);
  return (
    <div>
      {/* <h1>{productKey} product detail comming soon</h1> */}
      <Product productDetails={selectdProduct} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
