import axios from "./axios";

export const registerUserRequest = (data) => axios.post(`/user/register-user`, data)

export const getProfileUserRequest = (token) => axios.get(`/user/profile-user`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})