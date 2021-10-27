import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
//*Crear Nuevos Productos

export const crearNuevoProductoAction = (producto) => {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //*Insertar en la API
      await clienteAxios.post("/products", producto);
      //*Si todo sale bien, actualiza el State
      dispatch(agregarProductoExito(producto));
      //*Alera
      Swal.fire(
        "Success",
        "The Product Has Been Added Successfully",
        "success"
      );
    } catch (error) {
      console.log(error);
      //*Si hay un Error cambiar el Sate
      dispatch(agregarProductoError(true));
      //*Alerta de Error
      Swal.fire({ icon: "error", title: "Error", text: "Hubo un Error" });
    }
  };
};

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//* Si el Producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  //TODO Lo que esta aqui dentro es el action que en el reducer seria action.type
  type: AGREGAR_PRODUCTO_EXITO,
  //! El payload seria la Parte que va modificar los datos, el state
  payload: producto,
});

//* Si hubo un Error
const agregarProductoError = (err) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: err,
});

//*Funcion que Descarga los Productos de la DB
export const obtenerProductosAction = () => {
  //? NO toma ningun parametro porque ya viene desde la DB
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await clienteAxios.get("/products");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaProductosError());
    }
  };
};

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});
const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//*Selecciona y eliminar el Producto

export const borrarProductoAction = (id) => {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/products/${id}`);
      dispatch(eliminarProductoExito());
      //*Si Se Elimina Mostrar Alerta
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    } catch (error) {
      dispatch(eliminarProductoError());
      console.log(error);
    }
  };
};

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

//*Colocar Producto en Edicion

export const obtenerProductoEditar = (producto) => {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
};

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//*Editar un Registro en la API y State
export const editarProductoAction = (producto) => {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/products/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
    }
  };
};

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});
