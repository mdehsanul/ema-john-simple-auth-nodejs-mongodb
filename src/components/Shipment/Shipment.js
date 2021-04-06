import React, { useContext } from "react";
import "./Shipment.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  // context
  const [logInUser, setLogInUser] = useContext(UserContext);

  // save order in MongoDB
  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    const orderDetails = {
      ...logInUser,
      products: saveCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("http://localhost:4000/addOrder", {
      method: "POST",
      body: JSON.stringify(orderDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("your order placed successfully");
        }
      });
  };
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
      <input
        name="name"
        defaultValue={logInUser.name}
        ref={register({ required: true })}
        placeholder="name"
      />
      {errors.name && <span className="error">name is required</span>}

      <input
        name="email"
        defaultValue={logInUser.email}
        ref={register({ required: true })}
        placeholder="email"
      />
      {errors.email && <span className="error">email is required</span>}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="addres"
      />
      {errors.address && <span className="error">address is required</span>}

      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="phone"
      />
      {errors.phone && <span className="error">phone is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
