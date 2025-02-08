import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PlusCircle, BookOpen } from "lucide-react";
import CreateSubjectModal from "./CreateSubjectModal";
import CreateAcitivityForm from "./CreateActivityForm";

import { useActivity } from "@/context/ActivityContext";


function ActivityManager(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {totalByState, fetchTotalActivitiesByState} = useActivity();
  
  useEffect(() => {
    const fetchData = async() => {
      await fetchTotalActivitiesByState()
    }

    fetchData()
  },[])


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600"/>
          <h2 className="text-2xl font-semibold text-gray-800">Mis asignaturas y actividades</h2>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <PlusCircle className="h-5 w-5 mr-2"/>
          Crear asignatura
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <CreateAcitivityForm/>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              Resumen de actividades
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Actividades pendientes</span>
                <span className="font-semibold text-blue-600">{totalByState.pending}</span>
              </div>
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-600">Próximas Entregas</span>
                <span className="font-semibold text-red-600">3</span>
              </div> */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Actividades en progreso</span>
                <span className="font-semibold text-orange-600">{totalByState.progress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completadas</span>
                <span className="font-semibold text-green-600">{totalByState.completed}</span>
              </div>
            </div>

          </CardContent>
          
        </Card>
      </div>
      <CreateSubjectModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      onSuccess={() => setIsModalOpen(false)}/>
    </div>
  )
}

export default ActivityManager
