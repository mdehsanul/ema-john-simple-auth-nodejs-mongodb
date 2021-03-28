// rsc
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [logInUser, setLogInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        {/* Sign Out button */}
        <button onClick={() => setLogInUser({})}>Sign Out</button>
      </nav>
      <div className="search">
        <input type="search" placeholder="type here to search..." />
      </div>
    </div>
  );
};

export default Header;
