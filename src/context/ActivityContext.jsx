import { createContext, useState, useContext } from "react";
import { enqueueSnackbar } from "notistack";

import { 
  getActivityById,
  saveActivityRequest,
  getActivitiesRequest,
  getTotalActivitiesByState,
  updateActivity,
  getActivitySubjectId
 } from "../api/activity";

export const ActivityContext = createContext();

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if(!context){
    throw new Error("UseActivity must use be within of a activityProvider")
  }

  return context
}

export const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesBySubject, setActivitiesBySubject] = useState([]);
  const [saveSucess, setSaveSuccess]= useState(false)
  const [totalByState, setTotalByState] = useState([]);
  // const [errors, setErrors] = useState([]);



  const getActivitiesUser = async(state) => {
    try {     
      const token = localStorage.getItem('token');
      const res = await getActivitiesRequest(token, state);
      setActivities(res.data.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }


  const saveActities = async(data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await saveActivityRequest(data, token);
      
      if(res.data.status === true){
        setSaveSuccess(true)
        enqueueSnackbar("Actividad registrada con éxito", {
          variant: "success",
          autoHideDuration: 3000
        })
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchUpdateActivity = async(activity) => {
    try {
      const token = localStorage.getItem('token');
      const res = await updateActivity(token, activity);
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchTotalActivitiesByState = async() => {
    try {
      const token = localStorage.getItem('token');
      const res = await  getTotalActivitiesByState(token);
      setTotalByState(res.data.data)
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const fetchActivityById = async(activityId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await getActivityById(token, activityId);
      setActivity(res.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchActivitySubjectId = async(subjectId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await getActivitySubjectId(token, subjectId);
      setActivitiesBySubject(res.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  

  return (
    <ActivityContext.Provider
      value={{
        saveSucess,
        activities,
        activity,
        totalByState,
        activitiesBySubject,
        getActivitiesUser,
        fetchActivityById,
        saveActities,
        fetchUpdateActivity,
        setSaveSuccess,
        fetchTotalActivitiesByState,
        fetchActivitySubjectId
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityContext
