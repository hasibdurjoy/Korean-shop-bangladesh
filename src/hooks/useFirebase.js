import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getIdToken,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import initializeFirebase from "../firebase/firebase.init";
import { postFunction, updateFunction } from "../Api/CallApis";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminLoading, setAdminIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password, name, navigate) => {
    console.log("called");
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name };
        setUser(newUser);

        saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        navigate("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        // ..
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logindata");
        const destination = location?.state?.from || "/";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const logInWithGoogle = (location, navigate) => {
    console.log(location, navigate);
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setAuthError("");
        saveUser(user.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setAuthToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    setAdminIsLoading(true);
    fetch(`https://salty-ravine-02871.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
        setAdminIsLoading(false);
      });
  }, [user.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = async (email, displayName, method) => {
    const user = { email, displayName };
    try {
      if (method === "PUT") {
        const res = await updateFunction(
          "https://dry-tundra-71318.herokuapp.com/users",
          user
        );
        console.log("edited");
      } else {
        const res = await postFunction(
          "https://dry-tundra-71318.herokuapp.com/users",
          user
        );
        console.log("added");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    user,
    admin,
    authToken,
    isLoading,
    isAdminLoading,
    authError,
    registerUser,
    loginUser,
    logInWithGoogle,
    logOut,
  };
};

export default useFirebase;
