import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSubject } from "@/context/SubjectContext";
import { useActivity } from "@/context/ActivityContext";

import { Button } from "../ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {es} from "date-fns/locale"



function CreateAcitivityForm(){
  const {register, handleSubmit, formState: {errors}, setValue: setFormValue, watch,
  } = useForm({
    defaultValues: {
      subject: ""
    }
  });
  const {getSubjects, subjects} = useSubject();
  const {saveActities, saveSucess, setSaveSuccess} = useActivity();
  const [date, setDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const selectedSubject = watch('subject');



  function notNegative(e) {
    const notNegative = e.key;
    const isNegative = /[A-Z0-9]/.test(notNegative);
    if (!isNegative) {
      e.preventDefault();
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    data = {
      ...data,
      date,
    }
    
    await saveActities(data);
    setSubmitted(true);
  })

  useEffect(() => {
    
    const fetchData = async() => {
      await getSubjects()
    }
    fetchData();

    if(saveSucess){
      setDate(null);
      setSaveSuccess(false);
      setFormValue("subject", "");
      setFormValue("percentage", "");
      setFormValue("name", "");
    }
  
  }, [saveSucess, setSaveSuccess, setDate, setFormValue])

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="subject">Asignatura</label>
        <Select value={selectedSubject} 
          onValueChange={(value) => {
            setFormValue('subject', value); 
          }}>
          <SelectTrigger>
          <SelectValue placeholder="Seleccione una materia">
              {selectedSubject 
                ? subjects.find(subject => subject._id === selectedSubject)?.name 
                : "Seleccione una materia"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="">Nombre de la actividad</Label>
        <Input type="text" placeholder="Ej: Primer parcial" 
          {...register("name",{
            required: "El nombre de la actividad es necesario"
          })}
        />
        {errors.name && (
          <p className="text-red-700">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Fecha de entrega</Label>
        <Popover>
          <PopoverTrigger asChild> 
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4"/>
              {date ? format(date, "PPP", {locale: es}): "Seleccione una fecha"} 
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} locale={es} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="">Porcentaje de calificacion</Label>
        <Input id="percentage" type="number" placeholder="Ej: 50" min="0" max="100"
          onKeyDown={notNegative}
          onInput={(e) => {
            if(e.target.value > 100) e.target.value = 100;
          }}
          {...register("percentage", {
            required: "El porcentaje de calificacion es necesario",
          })}
        />
        {errors.percentage && (
          <p className="text-red-700">{errors.percentage.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-500">
        Guardar actividad
      </Button>
    </form>
  )
}

export default CreateAcitivityForm

