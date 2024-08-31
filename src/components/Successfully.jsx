import React from "react";
import { useLocation } from "react-router-dom"; // Importar useLocation
import Cards from "./Cards"
function Successfully() {
  const location = useLocation();
  const { id } = location.state || {}; // Acceder al ID pasado como estado

  return (
    <div className='flex justify-center  gap-4 w-full'>
      <div className='flex justify-center max-w-[500px]'>
        <Cards className='flex align-items-center'>
        <img className="w-[90px]" src="https://cdn.prod.website-files.com/66182d420e634ac8b9279dd6/66182d420e634ac8b9279ea7_Capa%201.svg" alt="Compra exitosa" />
        <h1 className="weight-[700]">¡Listo! El pago se encuentra aprobada</h1>
        {id && <p>Tu código de autorización es: {id}</p>}
        <p>Coordina con el comercio la entrega de tu producto</p>

        </Cards>
        </div>
    </div>
  );
}

export default Successfully;