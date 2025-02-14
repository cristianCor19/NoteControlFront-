import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Book, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useActivity } from "@/context/ActivityContext";
import { useEffect } from "react";

function SubjectDetailsModal({ isOpen, onClose, subject }) {

  const {fetchActivitySubjectId, activitiesBySubject} = useActivity();

  useEffect(() => {
    const fetchData = async () => {
      await fetchActivitySubjectId(subject._id);
    };
    fetchData();
  }, []);  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: subject.color }}
            >
              <Book className="w-4 h-4 text-white" />
            </div>
            <span>{subject.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Badge variant="secondary">
            {subject.activities.completed ?? 0} completadas
            </Badge>
            <Badge variant="secondary">
              {subject.activities.pending ?? 0} pendientes
            </Badge>
            <Badge variant="secondary">
              {subject.activities.progress ?? 0} progreso
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Actividades Recientes</h3>
            <ul className="space-y-2">
              {activitiesBySubject.map((activity) => (
                <li
                  key={activity._id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span>{activity.name}</span>
                  {activity.state === "completed" && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {activity.state === "in-progress" && (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  {activity.state === "pending" && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </li>
              ))}
            </ul>
            {(!activitiesBySubject || activitiesBySubject.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No hay actividades
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubjectDetailsModal;
