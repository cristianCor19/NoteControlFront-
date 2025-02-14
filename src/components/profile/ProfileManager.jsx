import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { useUser } from "@/context/UserContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { UserCircle, Bell, Trash2, LogOut } from "lucide-react";

import UpdateUserModal from "./UpdateUserModal";
import DeleteAccountModal from "./DeleteAccountModal";

function ProfileManager(){
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled]= useState(true);
 

  const {logout} = useSession();
  const {fetchProfile, profile} = useUser();

  useEffect(() => {
    const fetchData = async() => {
      await fetchProfile()
      
    }
    fetchData()
  },[])

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserCircle className="w-12 h-12 text-blue-500"/>
            <div>
              <h2 className="text-2xl font-semibold">
                {profile.name === undefined || profile.lastname ===undefined? ` Welcome ${profile.name || ""}` : `${profile.name} ${profile.lastname}`}
              </h2>
            </div>
          </div>
          <Button
            onClick={()=> setIsUpdateModalOpen(true)}
          >
            Actualizar datos
          </Button>
        </div>
        {/* <div className="flex items-center justify-between py-4 border-t border-b">
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-blue-600"/>
            <Label htmlFor="notifications" className="text-sm font-medium">Notificaciones</Label>
          </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div> */}
        <div className="space-y-4 pt-4">
          <Button variant="destructive" className="w-full" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar Cuenta
          </Button>
          <Link
            to="/"
            onClick={() => {logout()}}
          >
            <Button variant="outline" className="w-full mt-4" >
              <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
            </Button>
          </Link>
        </div>
      </CardContent>
      <UpdateUserModal 
      isOpen={isUpdateModalOpen}  
      onClose={() => setIsUpdateModalOpen(false)}
      profile={profile}
      />
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </Card>
  )
}

export default ProfileManager