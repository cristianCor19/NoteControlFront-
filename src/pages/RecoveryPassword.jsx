import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import RecoveryManager from "@/components/Recovery/RecoveryManager";

function RecoveryPassword(){
  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-gradient-to-b from-blue-body/50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white w-96 ">
        
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          }
        >
          <RecoveryManager />
        </Suspense>
     
      </div>
    </div>
  )
}

export default RecoveryPassword;