import React from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  // destructuring
  const { productKey } = useParams();
  // when API need to use useEffect()
  const selectdProduct = fakeData.find((product) => product.key === productKey);
  return (
    <div>
      {/* <h1>{productKey} product detail comming soon</h1> */}
      <Product productDetails={selectdProduct} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
