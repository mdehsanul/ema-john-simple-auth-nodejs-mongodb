import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import OrderReview from "./components/OrderReview/OrderReview";
import Inventory from "./components/Inventory/Inventory";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NoMatch from "./components/NoMatch/NoMatch";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// context API
export const UserContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <UserContext.Provider value={[logInUser, setLogInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <OrderReview></OrderReview>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          {/* default path */}
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          {/* for dynamic key use ":" */}
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          {/* path not found */}
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// start  -> App.js
// step-1 -> Header Component
// step-2 -> Shop Component (with fakeData)
// step-3 -> Product Component
// step-4 -> Cart Component
// step-5 -> React Routing
// step-6 -> state Management
// step-7 -> Firebase - Authentication with <PrivateRoute> Route
// step-8 -> DataBase(MongoDB)
