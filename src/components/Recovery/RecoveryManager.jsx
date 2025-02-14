import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MessageRecovery from "./MessageRecovery";
import FaildedRecovery from "./FailedRecovery";


import { useSession } from "@/context/SessionContext";

function RecoveryManager() {
  const { fetchSendEmailRecovery, emailRecovery, setEmailRecovery} = useSession();
  const [stateRecovery, setstateRecovery] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (email) => {
    await fetchSendEmailRecovery(email);
    setValue("email", "")
    if (!emailRecovery) {
      setstateRecovery(false);
      
    }
  });
  
  if (emailRecovery) {
    return (
      <div className="space-y-8">
        <MessageRecovery email={emailRecovery} onSuccess={() => setEmailRecovery()}/>
      </div>
    )
  }

  if(!stateRecovery){
    return (
      <div className="space-y-8">
        <FaildedRecovery 
          onSuccess={() => setstateRecovery(true)}
        />
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-8">
      <div className="border-b border-black/25">
        <h1 className="text-3xl font-bold text-blue-ti text-left ml-5 mb-2">
          Buscar tu cuenta
        </h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <p className="text-left mx-4">
          Por favor digita tu correo para buscar tu cuenta
        </p>
        <div className="space-y-2  mx-4">
          <Input
            id="name"
            placeholder="Ej: Matematicas"
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mr-5">
          <Button
            type="button"
            variant="destructive"
            className="mb-4 bg-gray-500"
          >
            <Link to="/">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-navbar hover:bg-blue-navbar">
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RecoveryManager;
