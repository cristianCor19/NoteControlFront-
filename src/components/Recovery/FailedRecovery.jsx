import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useEffect } from 'react';

function FaildedRecovery({ onSuccess }) {
  const navigate = useNavigate();

  return (
    <div className="text-centerm p-7">
      <p className="text-blue-ti text-2xl mb-5">No se encontró la cuenta</p>
      <p className="">
        {" "}
        No pudimos encontrar una cuenta asociada a este correo electrónico.
      </p>
      <div className='grid gap-3 mt-2 sm:flex '>
        <Button
          type="button"
          className="w-full bg-orange-300 hover:bg-cyan-600 font-bold text-white"
          onClick={onSuccess}
        >
          Usar otro correo
        </Button>
        <Button
          type="button"
          className="w-full bg-blue-ti text-white font-bold "
          onClick={() => navigate("/")}
        >
          Volver a login
        </Button>
        
      </div>
    </div>
  );
}

export default FaildedRecovery;
