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
export const GoogleSignIn = () => {
  // Create an instance of the Google provider object
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  // To sign in with a Google pop-up window, call signInWithPopup
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      const SignedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return SignedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// GitHub Sign In using firebase -----------------------------------------
export const GitHubSignIn = () => {
  // Create an instance of the GitHub provider object
  var githubProvider = new firebase.auth.GithubAuthProvider();
  // To sign in with a GitHub pop-up window, call signInWithPopup:
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      const user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  // creating User With Email And Password in firebase (a little work with firebase when working  manually)
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // Signed in
      const newUserInfo = response.user;
      newUserInfo.error = " ";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.error = " ";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
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
