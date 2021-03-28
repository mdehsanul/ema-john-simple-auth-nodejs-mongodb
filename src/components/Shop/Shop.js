import React, { useEffect } from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  // console.log(fakeData);
  // product part
  const firstTwentyData = fakeData.slice(0, 20);
  const [products, setProducts] = useState(firstTwentyData);

  // cart part
  const [cart, setCart] = useState([]);

  // if moveing multiple page, throught this code we can remain cart item same in the multiple page
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const orderProductKeys = Object.keys(saveCart);
    const previousCart = orderProductKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(previousCart);
  }, []);

  // event-handler to set cart item quentity
  const handleAddProduct = (props) => {
    const toBeAddedKey = props.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      props.quantity = 1;
      newCart = [...cart, props];
    }

    setCart(newCart);

    // localStorage from utilities folder
    addToDatabaseCart(props.key, count);
  };

  return (
    <div className="twin-container">
      {/* product part */}
      <div className="product-container">
        {products.map((product) => (
          <Product
            showAddToCart={true}
            productDetails={product}
            key={product.key}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      {/* cart part */}
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
