import { createContext, useState, useContext, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useSession } from "./SessionContext";

import {
  registerUserRequest,
  getProfile,
  updateUser,
  deleteUser,
} from "../api/user";
export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Use user must be used wihtin a provider");
  }

  return context;
};
export const UserProvider = ({ children }) => {
  const {setIsAuthenticated, setLoading} = useSession();
  const [profile, setProfile] = useState([]);
  const [errors, setErrors] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
 

  const signUp = async (user) => {
    try {      
      const res = await registerUserRequest(user);

      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getProfile(token);
      setProfile(res.data.data);
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const fetchUpdateUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const res = await updateUser(token, user);
      if (res.data.status === true) {
        enqueueSnackbar("Usuario actualizado con exito", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  const fetchDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await deleteUser(token);
      if (res.data.status === true) {
        setConfirmDelete(true);
        // localStorage.removeItem('token');
      }
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message];
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <UserContext.Provider
      value={{
        errors,
        profile,
        confirmDelete,
        signUp,
        fetchProfile,
        fetchUpdateUser,
        fetchDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
