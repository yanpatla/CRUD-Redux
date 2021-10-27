import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//*Muestra una Alerta

export const mostrarAlerta = (alerta) => {
  return (dispatch) => {
    dispatch(mostrarAlertaError(alerta));
  };
};
const mostrarAlertaError = (alerta) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta,
});

//*Ocultar Alerta
export const ocultarAlertaAction = () => {
  return (dispatch) => {
    dispatch(ocultarAlerta());
  };
};
const ocultarAlerta= ()=>({
    type:OCULTAR_ALERTA,
    payload:null
})