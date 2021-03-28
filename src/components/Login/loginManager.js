// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
// Add firebaseConfig when Initialize Firebase
import firebaseConfig from "../Login/firebase.config";

export const initializeLoginFramework = () => {
  // if firebase initialize 2 time then for avoid error need to write this condition
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
};

// Google Sign In using firebase -----------------------------------------
export const handleGoogleSignIn = () => {
  // Create an instance of the Google provider object
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  // To sign in with a Google pop-up window, call signInWithPopup
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      const isSignedIn = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(isSignedIn);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// Google Sign Out using firebase-------------------------------------------
export const handleGoogleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      const isSignedOut = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
      };
      setUser(isSignedOut);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// Facebook Sign In using firebase -----------------------------------------
export const handleFacebookSignIn = () => {
  // Create an instance of the Facebook provider object
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  // To sign in with a Facebook pop-up window, call signInWithPopup:
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      var user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

// GitHub Sign In using firebase -----------------------------------------
export const handleGitHubSignIn = () => {
  // Create an instance of the GitHub provider object
  var githubProvider = new firebase.auth.GithubAuthProvider();
  // To sign in with a GitHub pop-up window, call signInWithPopup:
  firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      var user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

export const createUserWithEmailAndPassword = () => {
  // creating User With Email And Password in firebase (a little work with firebase when working  manually)
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((response) => {
      // Signed in
      const newUserInfo = { ...user };
      newUserInfo.error = " ";
      newUserInfo.success = true;
      setUser(newUserInfo);
      updateUserName(user.name);
    })
    .catch((error) => {
      const newUserInfo = { ...user };
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
};

export const signInWithEmailAndPassword = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((response) => {
      const newUserInfo = { ...user };
      newUserInfo.error = " ";
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLogInUser(newUserInfo);
      // redirect route
      history.replace(from);
      console.log("Sign in user info:", response.user);
    })
    .catch((error) => {
      const newUserInfo = { ...user };
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
};

const updateUserName = (name) => {
  var user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      // Update successful.
      console.log("User name updated successfully");
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
};
