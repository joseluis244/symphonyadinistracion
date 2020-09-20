import React, { useState, useEffect } from "react";
import Funciones from "./Funciones";
import moment from "moment";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";

import "./Estudios.scss";

function Estudios() {
  const [Estudios, setEstudios] = useState({ listo: false, estudios: [] });
  let reloadlist = () => {
    setEstudios({ listo: false, estudios: [] });
    Funciones.cargarestudios().then((res) => {
      setEstudios({ listo: true, estudios: res.data });
    });
  }
  let contenido;
  if (Estudios.listo) {
    if (Estudios.estudios.length > 0) {
      contenido = <Lista reloadlist={reloadlist} estudios={Estudios.estudios} />;
    } else {
      contenido = <ListaVacia />;
    }
  } else {
    contenido = <Cargando />;
  }
  useEffect(() => {
    Funciones.cargarestudios().then((res) => {
      setEstudios({ listo: true, estudios: res.data });
    });
    return () => {
      //cleanup
    };
  }, []);
  return (
    <div id="Estudios">
      <h3>Estudios</h3>
      <div className="Contenedor">{contenido}</div>
    </div>
  );
}

const Cargando = () => {
  return <div>Cargando.....</div>;
};
const ListaVacia = () => {
  return <div>No existen registros.....</div>;
};
const Lista = (props) => {
  let array = props.estudios;
  let items = [];
  for (let index = array.length - 1; index > 0; index--) {
    const element = array[index];
    items.push(<ItemLista {...props} key={index} item={element} />);
  }
  return <ul className="Lista">{items}</ul>;
};
function escribirmodalidad(mod) {
  let Nmod;
  switch (mod) {
    case "CT":
      Nmod = "Tomografia";
      break;
    case "MR":
      Nmod = "Resonancia";
      break;
    case "CR":
      Nmod = "Rayos X";
      break;
    case "DX":
      Nmod = "Rayos X";
      break;
    case "US":
      Nmod = "Ecografia";
      break;
    default:
      Nmod = "DICOM";
      break;
  }
  return Nmod;
}
const ItemLista = (props) => {
  const [Borrar, setBorrar] = useState(false);
  const [TimeOut, setTimeOut] = useState(null);
  let Eliminar = () => {
    setTimeOut(
      setTimeout(() => {
        setBorrar(false);
      }, 20000)
    );
    setBorrar(true);
  };
  let CancelarEliminacion = () => {
    clearTimeout(TimeOut);
    setBorrar(false);
  };
  let EliminarEstudio = () => {
    clearTimeout(TimeOut);
    setBorrar(false);
    Funciones.eliminarestudio(props.item)
    .then(()=>{
      props.reloadlist()
    })
  };
  let Btns = Borrar ? (
    <ConfDel
      CancelarEliminacion={CancelarEliminacion}
      EliminarEstudio={EliminarEstudio}
    />
  ) : (
      <PreDel onBorrar={Eliminar} />
    );
  return (
    <li className="ItemLista">
      <div className="ItemLista1">
        <div className="ItemLista11">
          <div className="ItemLista111">{props.item.NOMBRE}</div>
          <div className="ItemLista112">{moment(
            props.item.FECHA,
            "YYYYMMDD"
          ).format("DD/MM/YYYY")}</div>
        </div>
        <div>{escribirmodalidad(props.item.SERIES[0].MODALIDAD)}</div>
      </div>
      <div className="ItemLista2">{Btns}</div>
    </li>
  );
};
const PreDel = (props) => {
  return (
    <IconButton edge="end" aria-label="delete" onClick={props.onBorrar}>
      <DeleteIcon />
    </IconButton>
  );
};
const ConfDel = (props) => {
  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={props.EliminarEstudio}>
        <Done />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={props.CancelarEliminacion}>
        <Close />
      </IconButton>
    </>
  );
};
export default Estudios;
