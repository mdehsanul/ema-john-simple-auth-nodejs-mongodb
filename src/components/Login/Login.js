import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { initializeLoginFramework } from "./loginManager";

function Login() {
  // useState()
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  // useContext()
  const [logInUser, setLogInUser] = useContext(UserContext);
  // useHistory()
  const history = useHistory();
  // useLocation()
  const loaction = useLocation();
  let { from } = loaction.state || { from: { pathname: "/" } };

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
    }
    // signIn With Email And Password
    if (!newUser && user.email && user.password) {
    }
    // prevent auto page loading when submit button click
    event.preventDefault();
  };

  // -------------------------------------------------------------------- End Implementation Mnually  ----------------------------------------------------------------------------------

  return (
    // ------------------------------ start firebase --------------------------------------
    <div style={{ textAlign: "center" }}>
      {/* conditional signIn, signOut */}
      {user.isSignedIn ? (
        // Sign Out buton
        <button onClick={handleGoogleSignOut}>Sign Out</button>
      ) : (
        // Sign In Button
        <button onClick={handleGoogleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={handleFacebookSignIn}>Log in using Facebook</button>
      <br />
      <button onClick={handleGitHubSignIn}>Log in using GitHub</button>

      {/* showing user Information when user SignedIn */}
      {user.isSignedIn && (
        <div>
          <p> Welcome {user.name} </p>
          <p>your email: {user.email}</p>
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
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}

      {/*--------------------------- End Manual ------------------------------------------*/}
    </div>
  );
}

export default Login;
