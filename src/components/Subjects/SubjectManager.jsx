import { useState } from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import CreateSubjectModal from "../Activities/CreateSubjectModal";
import SubjectList from "./SubjectList";

function SubjectManager(){
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Lista de Materias</h2>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
          <PlusCircle className="w-5 h-5 mr-2" />
          Agregar Materia
        </Button>
      </div>
      <SubjectList/>
      <CreateSubjectModal 
      isOpen={isCreateModalOpen} 
      onClose={() => setIsCreateModalOpen(false)}
      onSuccess={() => setIsCreateModalOpen(false)}/>
    </div>
  )
}

export default SubjectManager