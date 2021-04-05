import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleSignOut,
  handleFbSignIn,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  // -------------------------------------------------------------------- Start Implementation Mnually ---------------------------------------------------------------------------------

  // email, password validation Maually when email, password write in the input box ---------------------------------
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    // debugger;
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      //[...cart, newItem]
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  // when form is submitted --------------------------------------------
  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (response) => {
          handleResponse(response, true);
        }
      );
    }
    // signIn With Email And Password
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((response) => {
        handleResponse(response, true);
      });
    }
    // prevent auto page loading when submit button click
    event.preventDefault();
  };

  // -------------------------------------------------------------------- End Implementation Mnually  ----------------------------------------------------------------------------------

  return (
    // ------------------------------ start firebase --------------------------------------
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      {/*--------------------------- End firebase ------------------------------------------*/}
      {/*--------------------------- Start Manual ------------------------------------------*/}
      <h1>Our own authontication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="your name"
          />
        )}
        <br />
        <input
          type="text"
          // onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          placeholder="your email address"
          required
        />
        <br />
        <input
          type="password"
          // onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          placeholder="your password"
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      {/*--------------------------- End Manual ------------------------------------------*/}
    </div>
  );
}

export default Login;
