import axios from "./axios";

export const getActivityById = (token, activityId) => axios.get(`/activity/${activityId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getActivitySubjectId = (token, subjectId) => axios.get(`/activity/subject/${subjectId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getActivitiesRequest = (token, state) => axios.get(`/activity/user?state=${state}`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const saveActivityRequest = (data, token) => axios.post(`/activity/save-activity`, data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getTotalActivitiesByState = (token) => axios.get(`/activity/total-by-state`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const updateActivity = (token, activity) => axios.put(`/activity/update`, activity, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});