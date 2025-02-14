import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useActivity } from "@/context/ActivityContext";
import { Book, ChevronRight } from "lucide-react";
import SubjectDetailsModal from "./SubjectDetailsModal";

import { useSubject } from "@/context/SubjectContext";

function SubjectList() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { fetchSubjectWithActivities, subjectsWithActivities } = useSubject();

  useEffect(() => {
    const fetchData = async () => {
      await fetchSubjectWithActivities();
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-4">
      {subjectsWithActivities.map((subject) => (
        <Card key={subject._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: subject.color }}
                >
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{subject.name}</h3>
                  {/* <p className="text-sm text-gray-600">{subject.professor}</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {subject.activities.pending} pendientes
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {(!subjectsWithActivities || subjectsWithActivities.length === 0) && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No hay actividades
          </p>
        </div>
      )}

      {selectedSubject && (
        <SubjectDetailsModal
          subject={selectedSubject}
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}

export default SubjectList;
