import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //? Te permite usar Funciones asyncronas
import reducer from "./reducers/index";

const store = createStore(
  //*Este Store se Requiere en EL Componente Principal para que fluya los Datos a lo largo del Proyecto
  reducer,
  compose(
    applyMiddleware(thunk),
    //* Aqui adentro vamos a Colocar el Codigo para poder Utilizar Redux Developer Tools
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
