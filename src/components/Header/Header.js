// rsc
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
      </nav>
      <div className="search">
        <input type="search" placeholder="type here to search..." />
      </div>
    </div>
  );
};

export default Header;
