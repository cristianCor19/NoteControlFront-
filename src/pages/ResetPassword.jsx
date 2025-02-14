import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useSession } from "@/context/SessionContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./../styles/login.css";

function UpdatePassword() {
  const [searchParams] = useSearchParams();
  const [resetSuccesfull, setResetSuccesfull] = useState(false);
  const oobCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const { fetchResetPassoword } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [alerPassword, setAlerPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setAlerPassword(true);
      } else {
        data = {
          ...data,
          oobCode,
        };
        console.log(data);

        await fetchResetPassoword({...data, oobCode});
        setAlerPassword(false);
        setResetSuccesfull(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  useEffect(() => {
    if (resetSuccesfull) {
      navigate("/");
      setResetSuccesfull(false);
    }
  }, [resetSuccesfull, navigate, setResetSuccesfull]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h2 className="text-4xl font-bold text-blue-ti">Note Control</h2>
        <p className="mt-10 mb-4 font-bold">Crea tu nueva contraña</p>
        <p></p>
        <form onSubmit={onSubmit} className="grid">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              className="p-3 border-1 border-gray-50/100 rounded-lg shadow-md mb-4 w-full"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirma tu contraseña"
              className="p-3 border-1 border-gray-50/100 rounded-lg shadow-md w-full"
              {...register("confirmPassword", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 "
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {alerPassword && (
            <p className="text-red-500">Las contraseña no coinciden</p>
          )}
          <button
            type="submit"
            className="bg-blue-ti text-white p-1.5 rounded-sm mt-6 mb-5"
          >
            Restablecer
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
