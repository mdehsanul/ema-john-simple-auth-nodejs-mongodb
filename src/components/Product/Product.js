// rsc
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  // console.log(props.productDetails);
  const { img, name, seller, price, stock } = props.productDetails;
  return (
    <div className="productDetail">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>only {stock} left in stock - order soon</small>
        </p>
        <button
          className="main-button"
          // to avoid default click use arrow function in onClick()
          onClick={() => {
            props.handleAddProduct(props.productDetails);
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
