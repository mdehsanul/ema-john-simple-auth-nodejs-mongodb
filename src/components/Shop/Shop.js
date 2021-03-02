import React from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
  // console.log(fakeData);
  const firstTenData = fakeData.slice(0, 20);
  const [products, setProducts] = useState(firstTenData);
  // cart
  const [cart, setCart] = useState([]);
  // event-handler
  const handleAddProduct = (props) => {
    const newCart = [...cart, props];
    setCart(newCart);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            productSet={product}
            key={product.key}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
