import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Book,
  Percent,
} from "lucide-react";

import { useActivity } from "@/context/ActivityContext";
import UpdateActivityModal from "./UpdateActivityModal";
// import Activities from "@/pages/Activities";

function ActivityList() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { getActivitiesUser, activities} = useActivity();

  useEffect(() => {
    const fetchData = async () => {
      await getActivitiesUser(selectedStatus);
    };
    fetchData();
  }, [selectedStatus]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "progress":
        return <Clock className="w-4 h-4 text-red-500" />;
      case "completed":
        return <Clock className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      "progress": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      pending: "bg-red-100 text-red-800 hover:bg-red-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
    }

    return (
      <Badge className={styles[status]} variant="outline">
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Mis actividades</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            onClick={() => setSelectedStatus("all")}
            className="gap-2"
          >
            Todas
          </Button>
          <Button 
            variant={selectedStatus === "pending" ? "default": "outline"}
            onClick={() => setSelectedStatus("pending")}
            className="gap-2"
          >
            <AlertCircle className="w-4 h-4"/>
            Pendiente
          </Button>
          <Button
            variant={selectedStatus === "progress" ? "default" : "outline"}
            onClick={() => setSelectedStatus("progress")}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            En Progreso
          </Button>
          <Button 
            variant={selectedStatus === "completed" ? "default": "outline"}
            onClick={() => setSelectedStatus("completed")}
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4"/>
            Finalizadas
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        {activities?.map((item)=>(
          <Card key={item._id} className="hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => (
            setIsModalOpen(true),
            setSelectedActivity(item)
            )}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Book className="w-4 h-4"/>
                      <span>{item.nameSubject}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.dateEntry).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Percent className="w-4 h-4" />
                      <span>{item.percent}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    
                  />
                  {getStatusBadge(item.state)}
                </div>
              </div>

            </CardContent>

          </Card>
        ))}
      </div>
      {(!activities || activities.length === 0) && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No hay actividades {selectedStatus !== "all" && `${selectedStatus}`}
          </p>
        </div>
      )}
      <UpdateActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default ActivityList;
