import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <div>
      <Header></Header>
      <Shop></Shop>
    </div>
  );
}

export default App;

// start  -> App.js
// step-1 -> Header Component
// step-2 -> Shop Component
// step-3 -> Product Component
// step-4 -> Cart Component
