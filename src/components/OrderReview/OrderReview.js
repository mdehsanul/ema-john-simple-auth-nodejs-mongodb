import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import OrderReviewDetails from "../OrderReviewDetails/OrderReviewDetails";
import happyImage from "../../images/giphy.gif";
import "./OrderReview.css";
import { useHistory } from "react-router";

const OrderReview = () => {
  const [cart, setCart] = useState([]);

  // finally place order of the items that are select for Cart
  const [orderPlaced, setorderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedCheckout = () => {
    // setCart([]);
    // setorderPlaced(true);
    // processOrder();
    history.push("/shipment");
  };

  // removing order item from order review page
  const handleRemoveProduct = (props) => {
    const newReview = cart.filter((pd) => pd.key !== props.key);
    setCart(newReview);
    // removing from local storage
    removeFromDatabaseCart(props.key);
  };

  // Sending data in back-end fro Read
  useEffect(() => {
    // saving cart item
    const saveCart = getDatabaseCart();
    const orderProductKeys = Object.keys(saveCart);
    fetch("https://secure-waters-35832.herokuapp.com/productByKeys", {
      method: "POST",
      body: JSON.stringify(orderProductKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  // when order place "thank you" message
  let thankYou;
  if (orderPlaced) {
    thankYou = <img className="thankyou" src={happyImage} alt="" />;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <OrderReviewDetails
            product={pd}
            handleRemoveProduct={handleRemoveProduct}
            key={pd.key}
          ></OrderReviewDetails>
        ))}

        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="main-button" onClick={handleProceedCheckout}>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;
