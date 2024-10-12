import { z } from "zod";

// Definir el esquema de validación con Zod
export const paymentSchema = z.object({
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
      /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
      "El nombre del titular solo puede contener letras, acentos y espacios"
    ),

  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(10, "El DNI no puede tener más de 8 dígitos")
    .regex(/^\d{2}\.\d{3}\.\d{3}$/, "El DNI debe tener el formato 99.999.999"),

//   customerEmail: z
//     .string()
//     .email("Formato de email no válido") // Validación de formato de email
//     .nonempty("El email es requerido"),

// customerName: z
// .string()
// .nonempty("El nombre del titular es requerido")
// .regex(
//   /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
//   "El nombre del titular solo puede contener letras, acentos y espacios"
// ),

  installment: z.string(),
});

