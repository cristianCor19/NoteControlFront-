import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ListTodo } from "lucide-react"

export default function ActivityStates() {
  return (
    <section className="pt-2 pb-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Gestiona tus Actividades</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <ActivityStateCard
          icon={<ListTodo className="w-8 h-8 text-blue-500" />}
          title="Por Hacer"
          description="Actividades pendientes que necesitas comenzar."
          count={5}
          color="bg-blue-100"
        />
        <ActivityStateCard
          icon={<Clock className="w-8 h-8 text-yellow-500" />}
          title="En Progreso"
          description="Actividades que estás trabajando actualmente."
          count={3}
          color="bg-yellow-100"
        />
        <ActivityStateCard
          icon={<CheckCircle className="w-8 h-8 text-green-500" />}
          title="Completadas"
          description="Actividades que has terminado con éxito."
          count={8}
          color="bg-green-100"
        />
      </div>
    </section>
  )
}

function ActivityStateCard({ icon, title, description, count, color }) {
  return (
    <Card className={`${color} border-none`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-3xl font-bold">{count}</div>
        <p className="text-sm text-gray-500">actividades</p>
      </CardContent>
    </Card>
  )
}

