import React from "react";
import Cards from "./Cards";
import { CreditCard, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import modo from "../assets/modo.svg";
import { set } from "firebase/database";
import { ContextInput } from "../context/ContextInput";
import { useEffect } from "react";
import axios from "../../axiosConfig";
import { useState } from "react";
import { useParams } from "react-router-dom";

import carritoLogo from "../assets/carritoLogoVioleta.svg";
import formatearNumeros from "@/utils/formatearNumeros";
import "../components/spinner.css";
function Checkout() {
  const navigate = useNavigate();
  const { inputAmount, setInputAmount } = useContext(ContextInput);
  const {orderId} = useParams();
  const [order, setOrder]= useState("")
  const [loading, setLoading] = useState(true);
  const [amountFormateado, setamountFormateado] = useState(null)

  useEffect(()=>{
    const fetchData = async () => {
    try{
        const response = await axios.get(`https://tu-api/checkout/orders/${orderId}`)
        console.log("el order ID es: ", orderId)
        console.log("la respuesta es: ", response.data)
        setInputAmount(response.data.amount)
        console.log("el monto es:", response.data.amount)
        setOrder(response.data)
        setamountFormateado(formatearNumeros(response.data.amount))
    }catch{
        console.log("Error al obtener el detalle de la orden");
    }finally{
        setLoading(false);
    }
    }
    fetchData()
  },[orderId])

  console.log(inputAmount)

  return (
    <div className="flex justify-center p-5 ">
 {loading && <div className="loading-spinner"></div>}{" "}
      {!loading &&
      
      <div className="flex flex-col  gap-[22px] w-full max-w-[750px]">
        {/* <div className=" flex-col min-h-[96px] rounded-[16px] bg-primaryViolet text-white flex items-center gap-2 text-center justify-center"> */}
        <div className="flex min-h-[96px] justify-between rounded-[16px] bg-white pt-5 pb-5 px-8">

          <div className="flex flex-col  gap-1 ">
          <p className="font-600 text-[18px]">Total a pagar</p>
          <p className="text-[34px]"> ${amountFormateado}</p>
          </div>
          <img className="w-[60px]" src={carritoLogo}></img>
        </div>
        <div className="flex  justify-center align-middle ">
          <Cards className="p-5 m-5 ">
          <h1 className="font-semibold text-[26px]">Elegí el medio de pago</h1>

                        <Button
              className="bg-white border text-dark shadow-md hover:bg-transparent w-auto h-auto p-5"
              onClick={() => navigate("/pago-tarjeta/orders/ff2d5419-59b6-11eb-9483-12d963eaa349")}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-5">
                  <CreditCard className="w-5 h-5" />
                  <div className="flex flex-col  text-left ">
                    <p className="primary font-600 text-[16px]">
                      Pagar con tarjeta
                    </p>
                    <p className=" text-leyenda text-[14px]">
                      Crédito, débito y prepagas
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-primaryViolet" />
              </div>
            </Button>

            <Button className="bg-white border text-dark shadow-md hover:bg-transparent w-auto h-auto p-5"
            onClick={() => navigate("/pago-modo/orders/ff2d5419-59b6-11eb-9483-12d963eaa349")}>
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-5">
                  <img src={modo} alt="Credit Card" className="w-[24.67] " />{" "}
                  <div className="flex flex-col  text-left ">
                    <p className="primary font-600 text-[16px]">
                      Pagar con MODO
                    </p>
                    <p className=" text-leyenda text-[14px]">
                      Con app Modo o app bancarias
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-primaryViolet" />
              </div>
            </Button>
          </Cards>
        </div>
      </div>
      }
    </div>
  );
}

export default Checkout;
