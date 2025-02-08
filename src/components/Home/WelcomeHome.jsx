import { Button } from "@/components/ui/button"
import { BookOpen, Rocket, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function WelcomeHome() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-800">Bienvenido a tu Espacio Académico</h1>
      <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
        Organiza tus actividades, colabora con compañeros y alcanza tus metas académicas de manera eficiente.
      </p>
      <div className="flex justify-center space-x-4 mb-12">
        <Button className="bg-blue-600 hover:bg-blue-700"><Link to="/activities">Comenzar</Link> </Button>
        <Button variant="outline">Explorar Materias</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <FeatureCard
          icon={<BookOpen className="w-12 h-12 text-blue-500" />}
          title="Gestión de Actividades"
          description="Organiza y prioriza tus tareas académicas con facilidad."
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 text-green-500" />}
          title="Colaboración"
          description="Trabaja en equipo y comparte recursos con tus compañeros."
        />
        <FeatureCard
          icon={<Rocket className="w-12 h-12 text-purple-500" />}
          title="Seguimiento de Progreso"
          description="Visualiza tu avance y celebra tus logros académicos."
        />
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

