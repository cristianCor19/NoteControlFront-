import { createContext, useState, useContext } from "react";
import { enqueueSnackbar } from "notistack";
import { saveSubjectRequest, getSubjectsRequest } from "@/api/subject";




// Create and export the context directly as a named export
const SubjectContext = createContext();

// Custom hook as named export
export const useSubject = () => {
  const context = useContext(SubjectContext);
  
  if (!context) {
    throw new Error("UseSubject must use be within of a SubjectProvider");
  }
  
  return context;
};

// Provider component as named export
export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");

  const getSubjects = async() => {
    try {
      const res = await getSubjectsRequest(token);
      setSubjects(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const saveSubject = async (data) => {
    try {
      const res = await saveSubjectRequest(data, token);
      if(res.status === 201){
        enqueueSnackbar("Materia registrada con éxito", {
          variant: "success",
          autoHideDuration: 3000
        })
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        saveSubject,
        getSubjects,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};