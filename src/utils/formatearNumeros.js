const formatearNumeros =(number) => {
    return number.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

export default formatearNumeros;