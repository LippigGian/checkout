import React from 'react';
import Cards from './Cards';
import CheckoutForm from './CheckoutForm';
import { useContext } from 'react';
import { ContextInput } from "@/context/ContextInput";

function PagoTarjeta() {
  const {amount} = useContext(ContextInput);
  return (
    <div className='flex justify-center  gap-4 w-full'>
      <div className='flex flex-1 justify-center max-w-[500px]'>
        <Cards className='flex-1 '>
          <div className='p-4'>
            <p className='mb-4'>Ingresá los datos de la tarjeta</p>
            <CheckoutForm />
          </div>
        </Cards>
      </div>
      <div className='flex flex-1 justify-center max-w-[500px] h-fit'>
        <Cards className='flex-1 '>
          <div className='p-4 flex flex-col gap-4'>
            <p>Detalle de la compra</p>
            <div className='flex flex-row justify-between'>
              <p>Total a pagar</p>
              <p>${amount}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p>Descripción</p>
              <p>Prueba de pago</p>
            </div>
          </div>
        </Cards>
      </div>
    </div>
  );
}

export default PagoTarjeta;


