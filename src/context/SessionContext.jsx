import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import auth from "@/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import {
  loginUserRequest,
  verifySessionRequest,
  sendEmailRecovery,
  resetPassword,
  loginWithGoogle,
} from "../api/session";

export const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("UseSession must be used within a provider");
  }

  return context;
};

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [emailRecovery, setEmailRecovery] = useState();
  const [loading, setLoading] = useState(true);

  const signin = async (data) => {
    try {
      const res = await loginUserRequest(data);
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const signWithGoogle = async () => {
    try {
      // const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const data = {
        email: result.user.email,
        uid: result.user.uid,
        displayName: result.user.displayName,
        googleToken: token,

      }
 
      const res = await loginWithGoogle(data);
     
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.token);

    } catch (error) { 
      console.log(error.message);
    }
  };

  // const signWithFacebook = async () => {
  //   try {
  //     // const auth = getAuth();
  //     const provider = new FacebookAuthProvider();
  //     const result = await signInWithPopup(auth, provider);

  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;

  //     const data = {
  //       email: result.user.email,
  //       uid: result.user.uid,
  //       displayName: result.user.displayName,
  //       googleToken: token,

  //     }

  //   } catch (error) { 
  //     console.log(error.message);
  //   }
  // };

  const fetchSendEmailRecovery = async (email) => {
    try {
      const res = await sendEmailRecovery(email);

      if (res.status === 200) {
        setEmailRecovery(res.data.email);
      }
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const fetchResetPassoword = async (data) => {
    try {
      const res = await resetPassword(data);
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function checkLogin() {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifySessionRequest(token);
        if (!res.data) {
          return setIsAuthenticated(false);
        }

        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        errors,
        loading,
        emailRecovery,
        setEmailRecovery,
        signin,
        signWithGoogle,
      
        logout,
        fetchSendEmailRecovery,
        fetchResetPassoword,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
