/*La idea es que el endpoint luego sea cambiado dinamicamente dependiendo si es local o no, 
y se ponga el endpoint correspondiente*/

export const API_CONFIG = {
    contentType: "application/json",
    allowMethods: "GET,PUT,POST",
    allowOrigin: "*",
    endPoint: "http://localhost:8090",
    subjectAPI:"subjectAPI"
  };