
import { Form , FormControl, FormLabel, FormItem, FormMessage } from "./ui/form"; // Asegúrate de ajustar los imports según tu estructura de archivos
import {Input} from './ui/input';
import {Select} from './ui/select';
import {Button} from './ui/button';


import React from 'react';
import { useForm } from 'react-hook-form';
import { ContextInput } from "@/context/ContextInput";
const Tarjeta = () => {

  const {amount}  = useContext(ContextInput);


  return (
  
      <form>
        <FormItem>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <Input type="text" id="nombre" name="nombre" />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="apellido">Apellido</FormLabel>
          <Input type="text" id="apellido" name="apellido" />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="numero">Número de tarjeta</FormLabel>
          <Input type="text" id="numero" name="numero" />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="vencimiento">Fecha de vencimiento</FormLabel>
          <Input type="text" id="vencimiento" name="vencimiento" />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="cvv">CVV</FormLabel>
          <Input type="text" id="cvv" name="cvv" />
        </FormItem>

      <Button type="submit" className="mt-4 bg-primaryViolet text-white">
        Pagar
      </Button>
    </form>
  );
};

export default Tarjeta;
