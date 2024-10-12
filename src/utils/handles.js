// handle.js

export const handleCardNumberChange = (setTipoTarjeta, consultarTarjeta) => async (e) => {
    const cardNumber = e.target.value;
    console.log(cardNumber);
    
    if (cardNumber.length >= 5) {
      const tipo = await consultarTarjeta(cardNumber);
      setTipoTarjeta(tipo);
      console.log(tipo);
    }
  };
  
  export const handleInstallmentChange = (setSelectedInstallment) => (e) => {
    const selected = JSON.parse(e.target.value);
    setSelectedInstallment(selected);
    console.log("Installment seleccionado:", selected);
  };
  