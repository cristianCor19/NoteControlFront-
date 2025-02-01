import axios from "./axios";

export const registerUserRequest = (data) => axios.post(`/user/register-user`, data)