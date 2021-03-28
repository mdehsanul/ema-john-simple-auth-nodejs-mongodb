import React from "react";
import "./OrderReviewDetails.css";

const OrderReviewDetails = (props) => {
  const { img, name, quantity, price } = props.product;
  return (
    <div className="review-item">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-detail">
        <h4 className="product-name">{name}</h4>
        <p>Quantity: {quantity}</p>
        <p>
          <small>{price}</small>
        </p>
        <button
          className="main-button"
          onClick={() => props.handleRemoveProduct(props.product)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default OrderReviewDetails;
