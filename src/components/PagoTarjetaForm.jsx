import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CircleAlert } from "lucide-react"; // Importar el icono
import { Navigate, useNavigate } from "react-router-dom";
import "../components/spinner.css";
import axios from "../../axiosConfig";
//Context
import { ContextInput } from "../context/ContextInput";
import Cuotas from "./Cuotas";
import { paymentSchema } from "@/utils/paymentSchema";
import { formatDni } from "@/utils/formatoDocumento";

function CheckoutForm({ order }) {
  const [id, setId] = useState(undefined);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [tipoTarjeta, setTipoTarjeta] = useState(null);
  const [tarjetaCredito, setTarjetaCredito] = useState(null);
  const [installment, setInstallment] = useState(null);
  const { inputAmount, setInputAmount } = useContext(ContextInput);
  const [responseTarjeta, setResponseTarjeta] = useState(null);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  //Navegar a la pagina de exito
  const navigate = useNavigate();

  // Configurar react-hook-form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema), // Conectar Zod con react-hook-form
  });

  //Enviar compra al servidor
  const enviarCompra = async (order) => {
    setLoading(true);
    const response = await axios.post("/api/orders/sendform", { order });
    console.log("la order es:", order);
    setLoading(false); // Terminar el modo de carga
    if (response.data.success) {
      setId(response.data.id);
      navigate("/successfully", { state: { id: response.data.id } });
    } else {
      console.log("No se guardo correctamente en la base de datos.");
    }
  };

  //Enviar peticion tarjeta:
  const consultarTarjeta = async (numeroTarjeta) => {
    try {
      const bodyData = {
        accountId: "1738", //Dato que no tengo
        cardNumber: numeroTarjeta,
        bin: numeroTarjeta,
        currency: "032", //Dato que no tengo pero es siempre igual en pesos
        ecommerceManager: false, //Dato que no tengo
        mode: "ECOMMERCE", //Dato que no tengo
        price: order.amount,
        source: "dashboard_payment_link", //Dato que no tengo
        tenant: "cabal", //Dato que no tengo
        userUuid: "ff2d5419-59b6-11eb-9483-12d963eaa349", //Dato que no tengo
      };
      const response = await axios.post(`/api/numerotarjeta`, { bodyData });
      console.log(response.data);
      setResponseTarjeta(response);
      // console.log(response.data.data[0].type);
      setTarjetaCredito(response.data);
      setInstallment(response.data.data[0].installments);
      //Esto es lo que tengo qe mapear:
      console.log(
        "los installments son:",
        response.data.data[0].installments[0]
      );
      return response.data.data[0].type;
    } catch (error) {
      console.error("Error al consultar la tarjeta:", error);
      return null;
    }
  };

  const handleCardNumberChange = async (e) => {
    console.log(e.target.value);
    const cardNumber = e.target.value;
    if (cardNumber.length >= 5 && tipoTarjeta === null) {
      const tipo = await consultarTarjeta(cardNumber);
      setTipoTarjeta(tipo);
      console.log(tipo);
    }
  };

  const handleInstallmentChange = (e) => {
    const selected = JSON.parse(e.target.value);
    setSelectedInstallment(selected);
    console.log("Installment seleccionado:", selected);
  };

  //Desestructurar data
  const onSubmit = (data) => {
    console.log("la data enviada es:", data);
    console.log("el response de la tarjeta es: ", responseTarjeta);
    // Desestructurar los datos del formulario
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      cardHolderName,
      dni,
      customerEmail,
      customerName,
    } = data;


    // Crear un nuevo array u objeto con los datos desestructurados y agregar nuevos datos
    const nuevoArray = {
      data: {
        cardNumber: cardNumber,
        cardExpiration: expiryMonth + "/" + expiryYear,
        cardCVV: cvv,
        cardType: "CREDIT",
        cardBrand: "VISA",
        cardHolderName: cardHolderName,
        installments: selectedInstallment,
        customerEmail: customerEmail,
        customerName: customerName,
        identificationNumber: dni,
        cellphoneNumber: "",
        province: null,
        isNamePasted: false,
        isDNIPasted: false,
        isCVVPasted: false,
        isCardNumberPasted: false,
        sessionId: "22d6ca6f-1256-41bc-b3a1-9c0622b97db9",
        meta: {
          source: "https://checkout.sipago.coop",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
          clientIp: "181.44.116.160",
        },
        origin: "dashboard_payment_link",
        items: [
          {
            name: order.description,
            quantity: 1,
            unitPrice: {
              currency: "032",
              amount: order.amount,
            },
            itemId: null,
          },
        ],
        taxes: [],
        tip: null,
      },
      uuid: "674a5e0d-fa99-4caf-887a-6bb5d279eb74",
      hasPendingPayment: false,
      tokenCaptcha: "",
      appKey: "cabal",
      ecommerceManager: false,
      userUuid: "ff2d5419-59b6-11eb-9483-12d963eaa349",
    };

    console.log("Datos del formulario modificados:", nuevoArray);

    // const selectedInstallment = data.installment; // Aquí obtienes el valor seleccionado
    // console.log("Cuota seleccionada:", selectedInstallment);
    // Llamar a las funciones con el nuevo array de datos
    enviarCompra(nuevoArray);
  };

  tarjetaCredito && console.log(tarjetaCredito.data[0].name);
  return (
    <div className="max-w-[500px]">
      {loading && <div className="loading-spinner"></div>}{" "}
      {/* Indicador de carga */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column gap-[20px]">
          <Label className=" font-400 text-[20px] basis-5/6 ">
            Número de tarjeta
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("cardNumber", { required: true })}
              placeholder="Número de tarjeta"
              // autoComplete="off"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Previene la entrada de caracteres no numéricos
                }
              }}
              onChange={(e) => {
                handleCardNumberChange(e); // Llama a tu manejador personalizado
                register("cardNumber").onChange(e); // Llama al manejador de react-hook-form
              }}
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
          {tarjetaCredito && (
            <p className="self-end basis-1/6">{tarjetaCredito.data[0].name}</p>
          )}
        </div>
        <div className="flex mt-[15px]  gap-10">
          <Label className=" font-400 text-[20px]">
            Expiración
            <Input
              className="text-[14px] mt-[10px]"
              type="number"
              {...register("expiryMonth")}
              placeholder="Mes"
              min="1"
              max="12"
              inputMode="numeric" // Asegura que el teclado numérico se muestre en dispositivos móviles
              pattern="[0-9]*" // Restringe la entrada a solo números
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Previene la entrada de caracteres no numéricos
                }
              }}
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 2); // Limita la entrada a 2 caracteres
                }
              }}
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
              min="2024"
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 4);
                }
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Previene la entrada de caracteres no numéricos
                }
              }}
            />
            {errors.expiryYear && (
              <p className="mt-3 text-error text-[13px] flex ">
                <CircleAlert className="w-[40px] mr-2" />
                {errors.expiryYear.message}
              </p>
            )}
          </Label>

          <Label className=" font-400 text-[20px]">
            CVV
            <Input
              type="text"
              className="text-[14px] mt-[10px]"
              {...register("cvv")}
              placeholder="CVV"
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 4); // Limita la entrada a 2 caracteres
                }
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Previene la entrada de caracteres no numéricos
                }
              }}
            />
            {errors.cvv && (
              <p className="mt-3 text-error text-[13px] flex ">
                <CircleAlert className="w-[40px] mr-2" />
                {errors.cvv.message}
              </p>
            )}
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
              placeholder="DNI del titular"
              maxLength="10"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Previene la entrada de caracteres no numéricos
                }
              }}
              onInput={(e) => {
                e.target.value = formatDni(e.target.value);
              }}
            />
            {errors.dni && (
              <p className="mt-3 text-error text-[13px] flex flex  items-center">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.dni.message}
              </p>
            )}
          </Label>

          {tipoTarjeta === "CREDIT" && (
            <div className="flex flex-col">
              {/* <button onClick={handleClickBoton}>presioname</button> */}
              {installment.map((installment) => {
                return (
                  <Cuotas>
                    <div
                      className="flex gap-5 p-2 w-full justify-between"
                      key={installment.installmentId}
                    >
                      <div className="flex gap-[20px] ">
                        {/* <input
                          type="radio"
                          id={installment.installmentId}
                          name="installment"
                          value={installment.installmentId}
                          // value={installment}
                          {...register("installment")}
                        /> */}
                        <input
                          type="radio"
                          id={installment.installmentId}
                          name="installment"
                          value={JSON.stringify(installment)} // Enviar todo el objeto como valor
                          {...register("installment")}
                          onChange={handleInstallmentChange} // Llamar al manejador
                        />

                        <div className="gap-[20px]">
                          <p>{installment.name}</p>
                          <p>
                            CF: {(installment.financialRate * 100).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div>
                        {installment.financialRate > 0 ? (
                          <p className="bold">{installment.total}</p>
                        ) : (
                          <p>Sin interes</p>
                        )}
                      </div>
                    </div>
                  </Cuotas>
                );
              })}
            </div>
          )}
        </div>
        {/* <div className="">
          <Label className=" font-400 text-[20px]">
            Datos personales
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("customerEmail")}
              placeholder="E-mail"
            />
            <p>A esta dirección enviaremos el recibo</p>
            {errors.customerEmail && (
              <p className="mt-3 text-error text-[13px] flex flex  items-center">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.customerEmail.message}
              </p>
            )}
            </Label>
            <Label className=" font-400 text-[20px]">
            <Input
              className="text-[14px] mt-[10px]"
              type="text"
              {...register("customerName")}
              placeholder="Nombre y apellido"
            />
            {errors.customerName && (
              <p className="mt-3 text-error text-[13px] flex flex  items-center">
                <CircleAlert className="w-[18px] mr-2" />
                {errors.customerName.message}
              </p>
            )}
            </Label>
        </div> */}
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
