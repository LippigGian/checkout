import React from "react";
import Cards from "./Cards";
import { CreditCard, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextInput } from "@/context/ContextInput";
import modo from "../assets/modo.svg";

function Checkout() {
  const navigate = useNavigate();
  const { amount } = useContext(ContextInput);
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col  gap-[22px] ">
        <div className=" flex-col min-h-[96px] rounded-[16px] bg-primaryViolet text-white flex items-center gap-2 text-center justify-center">
          <p className="font-600 text-[18px]">Total a pagar</p>
          <p className="text-[34px]"> ${amount}</p>
        </div>
        <div className="flex min-h-[300px] justify-center align-middle ">
          <Cards className="p-5 m-5">
            <Button
              className="bg-white border text-dark shadow-md hover:bg-transparent w-auto h-auto p-5"
              onClick={() => navigate("/pago-tarjeta")}
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

                <ChevronRight className="w-5 h-5 text-primaryViolet" />
              </div>
            </Button>

            <Button className="bg-white border text-dark shadow-md hover:bg-transparent w-auto h-auto p-5">
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

                <ChevronRight className="w-5 h-5 text-primaryViolet" />
              </div>
            </Button>
          </Cards>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
