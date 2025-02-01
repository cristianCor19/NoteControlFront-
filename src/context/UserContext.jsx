import { createContext, useState, useContext, useEffect } from "react";

import { registerUserRequest } from "../api/user";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if(!context) {
    throw new Error('Use user must be used wihtin a provider');
  };

  return context;
}
export const UserProvider = ({children}) => {
  const [registerUser, setRegisterUser] = useState(false);
  const [errors, setErrors] = useState([]);

  const signUp = async (user) => {
    try {
      console.log(user);
      
      const res = await registerUserRequest(user);
      console.log(res);
      
      if (res.status === 200) {
        
        setRegisterUser(true);
      }  
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
      ? error.response.data
      : [error.response.data.message];
    }
  }

  useEffect(() => {
        
    if(errors.length > 0){
        
        const timer = setTimeout(() => {
            setErrors([])
        }, 5000)

        return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <UserContext.Provider
      value={{
        registerUser,
        errors,
        signUp,
        setRegisterUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
