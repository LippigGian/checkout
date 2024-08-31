import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check } from "lucide-react";

import { Navigate, useNavigate } from "react-router-dom";

import { writeToFirestore } from "../utils/ventas";

import { database, ref, set } from "../utils/firebaseConfig"; // Importar la instancia de la base de datos de Firebase
// Definir el esquema de validación con Zod
const schema = z.object({
  cardNumber: z
    .string()
    .min(16, "El número de tarjeta debe tener al menos 16 dígitos")
    .max(19, "El número de tarjeta no puede tener más de 19 dígitos")
    .regex(/^\d+$/, "El número de tarjeta solo puede contener dígitos")
    .transform((val) => val.replace(/\s+/g, "")), // Eliminar espacios para la validación

  expiryMonth: z
    .string()
    .min(1, "El mes debe tener al menos 1 dígitos")
    .max(2, "El mes no puede tener más de 2 dígitos")
    .regex(/^(0[1-9]|1[0-2])$/, "El mes debe estar entre 01 y 12"),

  expiryYear: z
    .string()
    .min(4, "El año debe tener al menos 4 dígitos")
    .max(4, "El año no puede tener más de 4 dígitos")
    .regex(/^\d{4}$/, "El año debe ser un número de 4 dígitos")
    .transform((val) => parseInt(val, 10)) // Convertir a número entero para la validación

    // Validar que el año no esté en el pasado (año actual o futuro)
    .refine((val) => val >= new Date().getFullYear(), {
      message: "El año de expiración debe ser el año actual o futuro",
    }),

  cvv: z
    .string()
    .length(3, "El CVV debe tener 3 dígitos")
    .regex(/^\d+$/, "El CVV solo puede contener dígitos"),

  cardHolderName: z.string().nonempty("Nombre del titular es requerido"),
});

function CheckoutForm() {
  const [id, setId] = useState(undefined);

  //Navegar a la pagina de exito
  const navigate = useNavigate();

  const enviarCompra = async (order) => {
  const response = await writeToFirestore(order);
  if(response.success){
    setId(response.id);
    navigate('/successfully', { state: { id: response.id } });
  }else {
    console.log("no se guardo correctamente en la base de datos.");
  }
  }


  // Configurar react-hook-form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Conectar Zod con react-hook-form
  });

  
    // Función para guardar la transacción en Firebase
    const saveTransaction = (data) => {
      const transactionRef = ref(database, 'transactions/' + new Date().getTime()); // Usa una marca de tiempo como ID único
      set(transactionRef, data)
        .then(() => {
          console.log('Transacción guardada con éxito');
        })
        .catch((error) => {
          console.error('Error al guardar la transacción:', error);
        });
    };
  
    // Función para manejar el envío del formulario
    const onSubmit = (data) => {
      console.log('Datos del formulario:', data);
      enviarCompra(data);
      saveTransaction(data); // Guarda la transacción en Firebase
    };


  return (
    <div className="max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>
            Número de tarjeta:
            <Input
              type="text"
              {...register("cardNumber")}
              placeholder="Ingresá los números de la tarjeta"
            />
            {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
          </Label>
        </div>
        <div className="flex mt-[15px]  gap-10">
          <Label>
            Expiración:
            <Input
              type="number"
              {...register("expiryMonth")}
              placeholder="Mes"
            />
            {errors.expiryMonth && <p>{errors.expiryMonth.message}</p>}
          </Label>

          <Label>
            Año:
            <Input type="text" {...register("expiryYear")} placeholder="Año" />
            {errors.expiryYear && <p>{errors.expiryYear.message}</p>}
          </Label>

          <Label>
            CVV:
            <Input type="text" {...register("cvv")} placeholder="CVV" />
            {errors.cvv && <p>{errors.cvv.message}</p>}
          </Label>
        </div>

        <div className="mt-[15px] mb-[15px]">
          <Label>
            Nombre
            <Input
              type="text"
              {...register("cardHolderName")}
              placeholder="Ingresá el nombre y apellido"
            />
            {errors.cardHolderName && <p>{errors.cardHolderName.message}</p>}
          </Label>
        </div>

        <div className="flex w-auto">
          <Button
            type="submit"
            className="bg-primaryViolet text-white rounded-[50px] w-full"
          >
            Pagar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
