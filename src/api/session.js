import axios from "axios";

export const loginUserRequest = (user) => axios.post(`/session/signIn`, user)