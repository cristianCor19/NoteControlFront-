import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/context/UserContext";
import { useSession } from "@/context/SessionContext";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function DeleteAccountModal({isOpen, onClose}){
  const [confirmText, setConfirmText] = useState("")
  const {fetchDeleteUser, confirmDelete} = useUser();
  const {logout} = useSession();
  const navigate = useNavigate();

  const handleDelete = async() => {
    if(confirmText.toLocaleLowerCase() === "eliminar"){
      await fetchDeleteUser(); 
    }
    if(confirmDelete){
      logout();
      navigate('/')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Cuenta</DialogTitle>
          <DialogDescription>Este accion es irreversible. Todos tus datos serán eliminados permanentemente.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm to-gray-500">Para confirmar, escribe &quot;eliminar&quot; en el campo de abajo:</p>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmar</Label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Escribe  'eliminar' "
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmText.toLowerCase() !== "eliminar"}
          >
            Eliminar Cuenta
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountModal