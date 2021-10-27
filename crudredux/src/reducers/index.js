import { combineReducers } from "redux"; //* Podes Agregar los reducer que quieras mientras los convines seimpre y cuando tengas uno
import productsReducer from "./productsReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  products: productsReducer,
  alert: alertReducer,
});
