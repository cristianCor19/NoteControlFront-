import axios from "./axios";

export const loginUserRequest = (user) => axios.post(`/session/signIn`, user);
export const verifySessionRequest = (token) => axios.get(`/session/verify-session`, {
  headers: { 
    Authorization: `Bearer ${token}`
  }
});

export const resetPassword = (data) => axios.post(`/session/reset-password`, data)

export const sendEmailRecovery = (email) => axios.post(`/session/send-email`, email);