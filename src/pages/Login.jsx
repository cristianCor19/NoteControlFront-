import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";


import './../styles/login.css'

function Login() {
  const { register, handleSubmit, formState: { errors }, setValue,} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const {signin, signWithGoogle ,isAuthenticated} = useSession();


  const onSubmit = handleSubmit(async(data) => {
    try {
      
      await signin(data);
      if (!isAuthenticated){
        setValue('password', '');
        
      }
    } catch (error) {
      console.log(error.message);
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home")
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h2 className="text-4xl font-bold text-blue-ti">Note Control</h2>
        <p className="mt-10 mb-4 font-bold">Inicia sesión en tu cuenta</p>
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
          <input type="password" placeholder="Digite su contraseña"
          className="p-3 border-1 border-gray-50/100 rounded-lg shadow-md" 
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres"
            }
          })}/>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button type="submit" className="bg-blue-ti text-white p-1.5 rounded-sm mt-6 mb-5">Iniciar sesión</button>
        </form>
        <Link to="/recovery-password" className="text-blue-link">
          He olvidado mi contraseña
        </Link>
        <section className="pt-10">
          <p className="pb-5">O continua con</p>
          <div className="flex items-center justify-center gap-6">
            <button onClick={signWithGoogle}>
              <img src="/img/google-icon.svg" alt="" className="icons-login "/>
            </button>
            {/* <button onClick={signWithFacebook}>
              <img src="/img/facebook-icon.svg" alt="" className="icons-login shadow-amber-400"/>
            </button> */}
          </div>
        </section>
        <p className="mt-16">¿No tienes una cuenta? <Link to='/register-user' className="text-blue-ti font-bold">Registrate</Link></p>

      </div>
    </div>
  );
}

export default Login;
