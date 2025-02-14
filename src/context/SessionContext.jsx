import { createContext, useState, useContext } from "react";
import { useEffect } from "react";

import { loginUserRequest, verifySessionRequest, sendEmailRecovery, resetPassword } from "../api/session";

export const SessionContext = createContext();

export const useSession = () =>{
  const context = useContext(SessionContext);

  if(!context) {
    throw new Error("UseSession must be used within a provider");
  }

  return context;

}

export const SessionProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([])
  const [emailRecovery, setEmailRecovery] = useState();
  const [loading, setLoading] = useState(true)
  

  const signin = async(data) => {
    try {
      const res = await loginUserRequest(data);
      setIsAuthenticated(true)
      localStorage.setItem('token', res.data.token); 
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message]
    }
  }

  const fetchSendEmailRecovery = async(email) => {
    try {
      const res = await sendEmailRecovery(email);
      
      if(res.status === 200 ){
        
        setEmailRecovery(res.data.email);
      }
    } catch (error) {      
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message]
    }
  }

  const fetchResetPassoword = async(data) => {
    try {
      const res = await resetPassword(data);
    } catch (error) {
      setErrors(Array.isArray(error.response.data))
        ? error.response.data
        : [error.response.data.message]
    }
  }


  const logout = ()=> {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  useEffect(() =>{
    const token = localStorage.getItem('token');
    async function checkLogin(){
      

      if(!token){
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifySessionRequest(token);
        if(!res.data){
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
  }, [])

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        errors,
        loading,
        emailRecovery,
        setEmailRecovery,
        signin,
        logout,
        fetchSendEmailRecovery,
        fetchResetPassoword
      }}
      >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContext