import axios from './axios'

export const getSubjectsRequest = (token) => axios.get(`/subject/get-subjects`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const saveSubjectRequest= (data, token) => axios.post(`/subject/save-subject`, data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

