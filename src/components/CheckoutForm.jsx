import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check } from "lucide-react";
import { CircleAlert } from "lucide-react"; // Importar el icono

import { Navigate, useNavigate } from "react-router-dom";

import "../components/spinner.css";
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
    .regex(/^([1-9]|1[0-2])$/, "El mes debe estar entre 01 y 12"),

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
    .min(3, "El CVV debe tener al menos 3 dígitos")
    .max(4, "El CVV no puede tener más de 4 dígitos")
    .regex(/^\d+$/, "El CVV solo puede contener dígitos"),

  cardHolderName: z
    .string()
    .nonempty("El nombre del titular es requerido")
    .regex(
      /^[a-zA-Z\s]+$/,
      "El nombre del titular solo puede contener letras y espacios"
    ),
});

function CheckoutForm() {
  const [id, setId] = useState(undefined);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  //Navegar a la pagina de exito
  const navigate = useNavigate();

  const enviarCompra = async (order) => {
    setLoading(true); // Iniciar el modo de carga
    const response = await writeToFirestore(order);
    setLoading(false); // Terminar el modo de carga
    if (response.success) {
      setId(response.id);
      navigate("/successfully", { state: { id: response.id } });
    } else {
      console.log("no se guardo correctamente en la base de datos.");
    }
  };

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
    const transactionRef = ref(
      database,
      "transactions/" + new Date().getTime()
    ); // Usa una marca de tiempo como ID único
    set(transactionRef, data)
      .then(() => {
        console.log("Transacción guardada con éxito");
      })
      .catch((error) => {
        console.error("Error al guardar la transacción:", error);
      });
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    enviarCompra(data);
    saveTransaction(data); // Guarda la transacción en Firebase
  };

  return (
    <div className="max-w-[500px]">
      {loading && <div className="loading-spinner"></div>}{" "}
      {/* Indicador de carga */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label className=" font-400 text-[20px] ">
            Número de tarjeta
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("cardNumber", { required: true })}
              placeholder="Ingresá los números de la tarjeta"
              // autoComplete="off"
            />
            {errors.cardNumber && (
              <p className="mt-3 text-error text-[13px] flex  items-center ">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.cardNumber.message}
              </p>
            )}
            {/* {errors.cardNumber && (
              <p className="mt-3 text-error text-[13px]">
                {errors.cardNumber.message}
              </p>
            )} */}
          </Label>
        </div>
        <div className="flex mt-[15px]  gap-10">
          <Label className=" font-400 text-[20px]">
            Expiración
            <Input
              className="text-[14px] mt-[10px]"
              type="number"
              {...register("expiryMonth")}
              placeholder="Mes"
              min="0"
              max="12"
            />
            {/* {errors.expiryMonth && <p className="mt-3 text-error text-[13px]">{errors.expiryMonth.message}</p>} */}
            {errors.expiryMonth && (
              <p className="mt-3 text-error text-[13px] flex ">
                <CircleAlert className="w-[40px] mr-2" />
                {errors.expiryMonth.message}
              </p>
            )}
          </Label>

          <Label className=" font-400 text-[20px]">
            Año
            <Input
              type="number"
              className="text-[14px] mt-[10px]"
              {...register("expiryYear")}
              placeholder="Año"
              min="0"
            />
            {errors.expiryYear && (
              <p className="mt-3 text-error text-[13px] flex ">
                <CircleAlert className="w-[40px] mr-2" />
                {errors.expiryYear.message}
              </p>
            )}
            {/* {errors.expiryYear && (
              <p className="mt-3 text-error text-[13px]">
                {errors.expiryYear.message}
              </p>
            )} */}
          </Label>

          <Label className=" font-400 text-[20px]">
            CVV
            <Input
              type="text"
              className="text-[14px] mt-[10px]"
              {...register("cvv")}
              placeholder="CVV"
            />
            {errors.cvv && (
              <p className="mt-3 text-error text-[13px] flex ">
                <CircleAlert className="w-[40px] mr-2" />
                {errors.cvv.message}
              </p>
            )}
            {/* {errors.cvv && (
              <p className="mt-3 text-error text-[13px]">
                {errors.cvv.message}
              </p>
            )} */}
          </Label>
        </div>

        <div className="mt-[15px] mb-[15px]">
          <Label className=" font-400 text-[20px]">
            Nombre
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("cardHolderName")}
              placeholder="Ingresá el nombre y apellido"
            />
            {errors.cardHolderName && (
              <p className="mt-3 text-error text-[13px] flex flex  items-center">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.cardHolderName.message}
              </p>
            )}
          </Label>
        </div>
        <div className="mt-[15px] mb-[15px]">
          <Label className=" font-400 text-[20px]">
            DNI
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("dni")}
              placeholder="Ingresá el DNI"
            />
            {errors.dni && (
              <p className="mt-3 text-error text-[13px] flex flex  items-center">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.dni.message}
              </p>
            )}
            {/* Falta agregar validacion de dni */}
          </Label>
        </div>

        <div className="flex w-auto pt-[64px]">
          <Button
            type="submit"
            className="bg-primaryViolet text-white rounded-[50px] h-[56px] w-full text-[16px] "
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
