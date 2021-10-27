import React, { useState } from "react";
//! useDispatch nos sirve para ejectuar las actions que tengamos y useSelector es una forma en la que vas  a acceder al sate dentro del componente
//TODO UseSelector es el hook que nos da react-redux para leer lo tengo en el State
import { useDispatch, useSelector } from "react-redux";

//*Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  //!Cuadno Histalamos React Router DOM tenemos Acceso a algo llamado history
  //*State del Componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //*utilizar useDispatch y te crea una funcion
  const dispatch = useDispatch();

  //*Acceder al State de Store
  const cargando = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alerta = useSelector((state) => state.alert.alerta);
  //*Mandar a llamar el Action del productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //*Cuando el Usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //*validar Form
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "All Inputs are Mandatory",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }
    //*Si no Hay errores
    dispatch(ocultarAlertaAction());
    //*Crear Producto
    agregarProducto({
      nombre,
      precio,
    });
    //*Redireccionar

    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text uppercase d-block w-100"
              >
                ADD
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 m4 text-center">
                Hubo un Error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
