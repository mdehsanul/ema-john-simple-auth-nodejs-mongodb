import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  // destructuring
  const { productKey } = useParams();

  // Read from MongoDB
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("https://secure-waters-35832.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  // when API need to use useEffect()
  // const selectdProduct = product.find((pd) => pd.key === productKey);

  return (
    <div>
      {/* <h1>{productKey} product detail comming soon</h1> */}
      {/* productDetails={selectdProduct} */}
      <Product productDetails={product} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
