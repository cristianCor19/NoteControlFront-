import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function MessageRecovery({ email, onSuccess }) {

  const navigate = useNavigate();

  const handleClick = () => {
      onSuccess();
      navigate('/');
  };

  return (
    <div className="text-centerm p-7">
      <p className="text-blue-ti text-2xl mb-5">Cuenta encontrada</p>
      <p className="">
        Hemos enviado un mensaje a tu correo:{" "}
        <span className="text-blue-navbar">{email}</span>{" "}
      </p>
      <div className="mt-3">
        <Button
          type="button"
          className="w-full bg-blue-ti text-white font-bold "
          onClick={handleClick}
        >
          Volver a login
        </Button>
      </div>
    </div>
  );
}

export default MessageRecovery;
