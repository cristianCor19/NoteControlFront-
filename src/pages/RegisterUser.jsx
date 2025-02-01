import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


import './../styles/login.css'

function RegisterUser() {
  const { register, handleSubmit, formState: { errors }, setValue,} = useForm();
//   const { register, handleSubmit, formState: { errors }, setValue,} = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
  const navigate = useNavigate();
  const {signUp ,registerUser,setRegisterUser, errors: signUpErrors} = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [alerPassword, setAlerPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }


  const onSubmit = handleSubmit(async(data) => {
    try {
        if(data.password !== data.confirmPassword){
            console.log('The passwords are same');
            setAlerPassword(true);
        }else{
            await signUp(data);
            setAlerPassword(false);
            console.log('are similars');
            
        }
    
    } catch (error) {
      console.log(error.message);
    }
  })

  useEffect(() => {
    if (registerUser) {
      navigate("/");
      setRegisterUser(false);
    }
  }, [registerUser, navigate, setRegisterUser]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h2 className="text-4xl font-bold text-blue-ti">Note Control</h2>
        <p className="mt-10 mb-4 font-bold">Crea tu cuenta</p>
        <p></p>
        <form onSubmit={onSubmit} className="grid" >
          <input type="email" placeholder="Digite su correo"
          className="p-3 border-1 border-gray-50/100 mb-4 rounded-lg shadow-md w-70"
          {...register("email", {
            required: "El correo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo inválido"
            }
          })}/>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="relative">

            <input type={showPassword ? "text" : "password"}  placeholder="Digite su contraseña"
            className="p-3 border-1 border-gray-50/100 rounded-lg shadow-md mb-4 w-full"
            {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
                }
            })}/>
            <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute top-1/2 right-2 transform -translate-y-1/2'
                >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
            {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}
          <div className="relative">

            <input type={showPassword ? "text" : "password"} placeholder="Confirma tu contraseña"
            className="p-3 border-1 border-gray-50/100 rounded-lg shadow-md w-full"
            {...register("confirmPassword", {
                required: "La contraseña es requerida",
                minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
                }
            })}/>
            <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute top-1/2 right-2 transform -translate-y-1/2 '
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
          <button type="submit" className="bg-blue-ti text-white p-1.5 rounded-sm mt-6 mb-5">Registrarte</button>
        </form>
        <section className="mt-6 mb-5">
          <p className="pb-5">O continua con</p>
          <div className="flex items-center justify-center gap-6">
            <img src="/img/google-icon.svg" alt="" className="icons-login "/>
            <img src="/img/facebook-icon.svg" alt="" className="icons-login shadow-amber-400"/>
          </div>
        </section>
        <Link to='/' className="text-blue-ti font-bold">¿Ya tienes una cuenta?</Link>

      </div>
    </div>
  );
}

export default RegisterUser;
