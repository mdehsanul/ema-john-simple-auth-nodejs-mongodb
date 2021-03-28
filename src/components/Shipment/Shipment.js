import React, { useContext } from "react";
import "./Shipment.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("example")); // watch input value by passing the name of it

  // context
  const [logInUser, setLogInUser] = useContext(UserContext);

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
