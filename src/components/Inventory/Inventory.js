import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddProducts = () => {
    const product = {};
    fetch("https://secure-waters-35832.herokuapp.com/addProduct", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name:</span>
          <input type="text" />
        </p>
        <p>
          <span>price:</span>
          <input type="text" />
        </p>
        <p>
          <span>qusntity:</span>
          <input type="text" />
        </p>
        <p>
          <span>product Image</span>
          <input type="file" />
        </p>
        <button onClick={handleAddProducts}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
