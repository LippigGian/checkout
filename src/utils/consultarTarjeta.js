  //Enviar peticion tarjeta:
  export const consultarTarjeta = async (numeroTarjeta) => {
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