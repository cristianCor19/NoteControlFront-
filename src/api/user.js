import axios from "./axios";
export const getProfile = (token) => axios.get(`/user/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const registerUserRequest = (data) => axios.post(`/user/register-user`, data)

export const updateUser = (token, user) => axios.put(`/user/update`,user,{
  headers: {
    Authorization: `Bearer ${token}`
  }
}) 

export const deleteUser = (token) => axios.delete(`/user/delete`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
