import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import { Dialog, DialogContent,DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActivity } from "@/context/ActivityContext";
import { useForm } from "react-hook-form";

function UpdateActivityModal({isOpen, onClose, onSuccess, activity}) {
  const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm();
  const [submitted, setSubmitted] = useState(false);
  const {fetchUpdateActivity} = useActivity();
  const selectedState = watch('state');

  const onSubmit = handleSubmit(async(activity) => {
    await fetchUpdateActivity(activity);
      // console.log(activity);
      
    setSubmitted(true);
  })

  useEffect(() => {
    if (activity) {
      setValue("_id", activity._id)
      setValue("name", activity.name);
      setValue("percent", activity.percent);
      setValue("state", activity.state);
      setValue("qualification", activity.qualification);
    }
  }, [activity, setValue]);

  useEffect(() => {
    if(submitted) {
      onSuccess();
      setSubmitted(false);
      
    }
  }, [onSuccess, submitted])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar actividad</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la actividad</Label>
            <Input placeholder="Ej: Parcial 2" type="text" 
              {...register("name", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Porcentaje de la actividad</Label>
            <Input placeholder="Ej: Parcial 2" type="number"
              {...register("percent", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Calificacion de la actividad</Label>
            <Input placeholder="Ej: Parcial 2" type="number"
              {...register("qualification", {
                required: false,
              })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="subject">Estado de la actividad</label>
            <Select value={selectedState} 
              onValueChange={(value) => {
                setValue('state', value); 
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un estado">
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="progress">Progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
              </SelectContent>
            </Select>
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

export default UpdateActivityModal