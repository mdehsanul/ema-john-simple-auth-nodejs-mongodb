import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddProducts = () => {
    fetch("http://localhost:4000/addProduct", {
      method: "POST",
      body: JSON.stringify(fakeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button onClick={handleAddProducts}>Add Product</button>
    </div>
  );
};

export default Inventory;
