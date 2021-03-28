import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  //   console.log(cart);
  //   const totalPrice = cart.reduce((total, product ) => total + product.price, 0);
  // another way to use reduce() manually
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice = totalPrice + product.price * product.quantity;
    // debugger;
  }

  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 4.99;
  } else if (totalPrice > 0) {
    shipping = 12.99;
  }

  //   const tax = Math.round(totalPrice * 0.1);
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shipping + parseFloat(tax);
  // removing
  const formateNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  return (
    <div>
      <h2>order summery</h2>
      <p>Items Order: {cart.length}</p>
      <p>Product Price:{formateNumber(totalPrice)}</p>
      <p>
        <small>Shipping Cost: {shipping}</small>
      </p>
      <p>
        <small>Tax + Vat: {formateNumber(tax)}</small>
      </p>
      <p>Total Price: {formateNumber(grandTotal)}</p>
      {props.children}
    </div>
  );
};

export default Cart;
