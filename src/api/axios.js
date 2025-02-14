import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-control-notes.vercel.app',
    withCredentials: true
})

export default instance