import React, { Fragment, useEffect } from "react";

//*Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Producto from "./Producto";
const Productos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //*Consultar la API
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  //*Obtener el State
  const productos = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const cargando = useSelector((state) => state.products.loading);
  return (
    <Fragment>
      <h2 className="text-center my-5">Product List</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un Error
        </p>
      ) : null}
      {cargando ? <p className="text-center">Cargando....</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
