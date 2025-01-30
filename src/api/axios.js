import axios from 'axios';

const instance = axios.create({
    baseURL: 'htpp://localhost:3000',
    withCredentials: true
})

export default instance