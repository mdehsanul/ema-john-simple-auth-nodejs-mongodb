import React from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
  // console.log(fakeData);
  // product part
  const firstTwentyData = fakeData.slice(0, 20);
  const [products, setProducts] = useState(firstTwentyData);
  // cart part
  const [cart, setCart] = useState([]);
  // event-handler to set cart part value, when button click then response from Product.js
  const handleAddProduct = (props) => {
    const newCart = [...cart, props];
    setCart(newCart);
  };
  return (
    <div className="shop-container">
      {/* product part */}
      <div className="product-container">
        {products.map((product) => (
          <Product
            productDetails={product}
            key={product.key}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      {/* cart part */}
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
