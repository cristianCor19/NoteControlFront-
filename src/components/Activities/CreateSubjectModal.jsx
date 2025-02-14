import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ColorSelect from "./ColorSelect";
import { useForm } from "react-hook-form";

import { useSubject } from "@/context/SubjectContext";

function CreateSubjectModal({isOpen, onClose, onSuccess}){
  const {register, handleSubmit, formState: {errors}, setValue} = useForm()
  const [selectedColor, setSelectColor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const {saveSubject} = useSubject();

  const onSubmit = handleSubmit(async(data) => {
    // e.preventDefaul();
    const customColor = selectedColor.toLocaleLowerCase()
    data = {
      ...data,
      customColor,
    }
    await saveSubject(data);
    setSubmitted(true);
  });

  useEffect(() => {
    if(submitted) {
      onSuccess();
      setSubmitted(false);
      setSelectColor("");
      setValue("subject", "");
    }
  },[submitted, onSuccess, setValue])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nueva asignatura</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Asignatura</Label>
            <Input id="name" placeholder="Ej: Matematicas"
              {...register("subject", {required: true})}
            />
            {errors.subject && (
              <p className="text-red-500">La asigntarua es requerida</p>
            )}
          </div>
          <div className="space-y-4">
            <Label>Selecciona un color</Label>
            <ColorSelect selectedColor={selectedColor} onColorSelect={setSelectColor}/>
            
          </div>
         
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cerrar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Guardar
            </Button>
          </div>

        </form>

      </DialogContent>

    </Dialog>
  );
}

export default CreateSubjectModal