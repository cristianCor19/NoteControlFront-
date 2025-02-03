import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function Activities(){
  return(
    <div className="min-h-screen bg-gradient-to-b from-blue-body/50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">
          Gestión de actividades
        </h1>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
          }
        >
        </Suspense>
      </div>
    </div>
  )
}

export default Activities