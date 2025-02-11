import { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent,DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";


function UpdateUserModal({isOpen, onClose, profile}){
  const {register, handleSubmit, formState: {errors},setValue} = useForm();
  const {fetchUpdateUser} =  useUser();

  
  const onSubmit = handleSubmit(async(user)=>{

    await fetchUpdateUser(user);
    onClose();
    
  })


  useEffect(() => {
    if(profile){
      setValue("name", profile.name);
      setValue("lastname", profile.lastname);
      setValue("carrier", profile.carrier);
      setValue("phone", profile.phone)
    }

  }, [profile, setValue])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre </Label>
            <Input placeholder="Ej: Dario" type="text" 
              {...register("name", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input placeholder="Ej: Gomez" type="text"
              {...register("lastname", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carrier">Nombre de tu carrera</Label>
            <Input placeholder="Ingeniera de sistemas" type="text"
              {...register("carrier", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Numero de telefono</Label>
            <Input placeholder="Numero de telefono" type="number"
              {...register("phone", {
                required: false,
                pattern: {
                  value: /^\d{10}$/, 
                  message: "El número debe tener 10 dígitos"
                }

              })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cerrar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Actualizar
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateUserModal