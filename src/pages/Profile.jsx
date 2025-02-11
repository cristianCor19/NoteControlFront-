import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { SnackbarProvider } from "notistack";
import ProfileManager from "@/components/profile/ProfileManager";

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">
          Perfil de usario
        </h1>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
          }
        >
          <ProfileManager />
        </Suspense>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
      </div>
    </div>
  );
}

export default Profile;
