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
  const [products, setProducts] = useState([]);
  // const firstTwentyData = fakeData.slice(0, 20);
  // const [products, setProducts] = useState(firstTwentyData);

  // Read from MongoDB
  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // cart part
  const [cart, setCart] = useState([]);

  // if moveing multiple page, throught this code we can remain cart item same in the multiple page
  useEffect(() => {
    const saveCart = getDatabaseCart(); // loacal database
    const orderProductKeys = Object.keys(saveCart);
    fetch("http://localhost:4000/productByKeys", {
      method: "POST",
      body: JSON.stringify(orderProductKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
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
