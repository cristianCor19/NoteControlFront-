import ActivityList from "../components/Activities/ActivityList"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function MyTask(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          }
        >
          <ActivityList />
        </Suspense>
      </div>
    </div>
  )
}

export default MyTask