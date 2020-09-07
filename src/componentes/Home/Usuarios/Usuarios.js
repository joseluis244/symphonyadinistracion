import React, { useState, useEffect } from "react";
import User from "./User";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UserList from "./UserList";
import TextField from "@material-ui/core/TextField";

import EditIcon from "../iconos/edit-black-48dp.svg";
import "./Usuario.scss";

function Usuarios() {
  const [Lista, setLista] = useState({ listo: false, lista: [] });
  const [Updateuser, setUpdateuser] = useState({});
  const [Componente, setComponente] = useState(0);
  let crearusuario = () => {
    setTimeout(() => {
      setComponente(2);
    }, 250);
  };
  let editarusuario = (e) => {
    setUpdateuser(e);
    setTimeout(() => {
      setComponente(1);
    }, 250);
  };
  let regresar = () => {
    UserList.CargarLista().then((res) => {
      setLista({ listo: true, lista: res });
    });
    setComponente(0);
  };
  let Comp = [
    <Main OnCreate={crearusuario} OnEdit={editarusuario} Lista={Lista} />,
    <Editar OnFinish={regresar} usuario={Updateuser} />,
    <Crear OnFinish={regresar} />,
  ];
  useEffect(() => {
    console.log("efecto")
    UserList.CargarLista().then((res) => {
      setLista({ listo: true, lista: res });
    });
    return () => {
      //cleanup
    };
  }, []);
  return <div id="Usuarios">{Comp[Componente]}</div>;
}
//////////////////////////////////////////
let Main = (props) => {
  let array = props.Lista.lista;
  let Items = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    Items.push(<ItemLista key={index} {...props} usuario={element} />);
  }
  return (
    <div className="Main">
      <div>
        <h3>Usaurios</h3>
      </div>
      <div className="Main1">
        <Button variant="contained" color="secondary" onClick={props.OnCreate}>
          Agregar Usuario
        </Button>
      </div>
      <div className="Main2">{props.Lista.listo ? Items : "Cargando..."}</div>
    </div>
  );
};

let ItemLista = (props) => {
  let usuario = props.usuario;
  let Edit = () => {
    props.OnEdit(usuario);
  };
  return (
    <div className="ItemLista">
      <div className="ItemLista1">{`${usuario.DATOS.NOMBRE} ${usuario.DATOS.APELLIDO}`}</div>
      <div className="ItemLista2" onClick={Edit}>
        <IconButton edge="end" aria-label="delete">
          <img src={EditIcon} alt="icon" width={25} />
        </IconButton>
      </div>
    </div>
  );
};
/////////////////////////////////////////////////////////////
let Editar = (props) => {
  const [usuario, setusuario] = useState(props.usuario);
  let Cambiar = (e) => {
    let A = usuario;
    A.DATOS[e.target.name] = e.target.value;
    setusuario({ ...A });
  };
  let GuardarCambios = () => {
    UserList.updateuser(usuario)
      .then((res) => {
        if (!res.err) {
          props.OnFinish()
        }
      })
  }
  let Borrar = () => {
    UserList.borrarusuario(usuario)
      .then((res) => {
        if (!res.err) {
          props.OnFinish()
        }
      })
  }
  return (
    <div className="Editar">
      <h3>Editar</h3>
      <div className="Contenedor">
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.NOMBRE}
            name="NOMBRE"
            label="Nombres"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.APELLIDO}
            name="APELLIDO"
            label="Apellidos"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.PREFIJO}
            name="PREFIJO"
            label="Prefijo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.TELEFONO}
            name="TELEFONO"
            label="Telefono"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.CORREO}
            name="CORREO"
            label="Correo"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={GuardarCambios}
          style={{ marginRight: "15px" }}
        >
          Editar
        </Button>
        <Button variant="contained" color="secondary" onClick={Borrar} style={{ marginRight: "15px" }}>
          Borrar
        </Button>
        <Button variant="contained" color="secondary" onClick={props.OnFinish}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
//////////////////////////////////////////////////////
let Crear = (props) => {
  const [usuario, setusuario] = useState(new User().json());
  let Cambiar = (e) => {
    usuario.DATOS[e.target.name] = e.target.value
    if (e.target.name === "CORREO") {
      usuario.LOGIN.USUARIO = e.target.value
    }
    setusuario({ ...usuario })
  }
  let GuardarCambios = () => {
    if (UserList.validardatos(usuario)) {
      UserList.crearusuario(usuario)
        .then((res) => {
          if (!res.err) {
            props.OnFinish()
          }
        })
    } else {
      console.log("mal")
    }
  }
  return (
    <div className="Crear">
      <h3>Editar</h3>
      <div className="Contenedor">
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.NOMBRE}
            name="NOMBRE"
            label="Nombres"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.APELLIDO}
            name="APELLIDO"
            label="Apellidos"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.PREFIJO}
            name="PREFIJO"
            label="Prefijo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.TELEFONO}
            name="TELEFONO"
            label="Telefono"
            style={{ width: "100%" }}
          />
        </div>
        <div className="InputCont">
          <TextField
            onChange={Cambiar}
            value={usuario.DATOS.CORREO}
            name="CORREO"
            label="Correo"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={GuardarCambios}
          style={{ marginRight: "15px" }}
        >
          Crear
        </Button>
        <Button variant="contained" color="secondary" onClick={props.OnFinish}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Usuarios;
