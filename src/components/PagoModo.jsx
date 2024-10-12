import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";
import "../components/spinner.css";
import formatearNumeros from "@/utils/formatearNumeros";
const PagoModo = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState("");
  const [order2, setOrder2] = useState("");
  const [loading, setLoading] = useState(true);
  const [amountFormateado, setAmountFormateado] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        //Obtener datos de la orden de compra (por si entra directo al link de qr):
        const response = await axios.get(
          `https://tu-api/pago-tarjeta/orders/${orderId}`
        );
        setOrder(response.data);
        setAmountFormateado(formatearNumeros(response.data.amount));

        //Crear codigo QR:
        const bodyData = {
          totalAmount: order.amount,
          urlCallback: "https://www.google.com/search?q=success",
          urlSuccess: "https://www.google.com/search?q=failed",
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: "NUMERODETOKEN123456", //  token que necesitamos para pegarle al endpoint
        };
        const response2 = await axios.post(
          `https://tu-api/pago-modo/orders/${orderId}`,
          bodyData,
          { headers }
        );
        setOrder2(response2.data);
        //Llamado a la funcion para comenzar la comunicacion cliente-servidor
        listenForPayment(response2.data.subscriptionUrl);
      } catch {
        console.log("Error al obtener el detalle de la orden");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  // Logica para escuchar el estado de pago usando SSE
  const listenForPayment = (subscriptionUrl) => {
    console.log("el url de suscripcion es: ", subscriptionUrl);
    const eventSource = new EventSource(subscriptionUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje recibido:", data);

      // Si el pago es exitoso:
      if (data.status === "SUCCESS") {
        console.log("Pago completado exitosamente");

        // Redirigir o mostrar mensaje de éxito
        navigate("/pago-exitoso");

        // Si hubo un error en el pago:
      } else if (data.status === "FAILED") {
        console.log("Pago fallido");
        // Redirigir o mostrar mensaje de error
        navigate("/pago-fallido");
      }
    };
    //Error de conexion con el servidor:
    eventSource.onerror = (error) => {
      console.error("Error en SSE:", error);
      eventSource.close();
    };

    // Cerrar la conexión SSE al desmontar el componente
    return () => {
      eventSource.close();
    };
  };

  console.log(amountFormateado);
  return (
    <>
      {loading && <div className="loading-spinner"></div>}{" "}
      {!loading && (
        <div className="flex flex-col items-center gap-3">
          <h1>Escaneá el código QR para pagar</h1>
          <p>Monto: ${amountFormateado}</p>
          <div>
            <img src={order2.imgQR}></img>
          </div>
        </div>
      )}
    </>
  );
};

export default PagoModo;
