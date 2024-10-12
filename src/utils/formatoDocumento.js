// Función para formatear el DNI con los puntos
export const formatDni = (value) => {
    return value
      .replace(/\D/g, "") // Eliminar caracteres no numéricos
      .replace(/(\d{2})(\d{0,3})(\d{0,3})/, (match, p1, p2, p3) => {
        let formatted = p1;
        if (p2) formatted += "." + p2;
        if (p3) formatted += "." + p3;
        return formatted;
      }) // Insertar puntos en las posiciones correctas
      .slice(0, 10); // Limitar a 10 caracteres (incluyendo los puntos)
  };

  