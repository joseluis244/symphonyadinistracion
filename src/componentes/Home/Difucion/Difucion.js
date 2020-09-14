import React, { useState, useEffect } from "react";
import Clientes from "./Difuciones";

import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "./Difucion.scss";

function Difucion() {
  const [MainComp, setMainComp] = useState(0)
  const [itemupdate, setitemupdate] = useState({})
  let AgregarDifucion = ()=>{
    setMainComp(1)
  }
  let EditarDifucion = (update)=>{
    setitemupdate({...update})
    setMainComp(2)
  }
  let ListaDifucion = ()=>{
    setMainComp(0)
  }
  let maincomp
  switch (MainComp) {
    case 0:
      maincomp=<Lista AgregarDifucion={AgregarDifucion} EditarDifucion={EditarDifucion}/>
      break;
      case 1:
      maincomp=<Agregar ListaDifucion={ListaDifucion}/>
      break;
      case 2:
      maincomp=<Editar ListaDifucion={ListaDifucion} itemupdate={itemupdate}/>
      break;
  
    default:
      maincomp=<Lista />
      break;
  }
  return (
    <div id="Difucion">
      <div className="Cabeza">Difucion</div>
      <div className="Componente">
        {maincomp}
      </div>
    </div>
  );
}
/////////////////////////////////////
const Lista = (props) => {
  const [DificionItems, setDificionItems] = useState({
    listo: false,
    items: [],
  });
  let Cont = DificionItems.listo ? (
    DificionItems.items.length > 0 ? (
      <ListaDificion items={DificionItems.items} {...props}/>
    ) : (
      <Vasio />
    )
  ) : (
    <Cargando />
  );
  useEffect(() => {
    Clientes.cargardifucion().then((res) => {
      if (!res.err) {
        setDificionItems({ listo: true, items: res.data });
      }
    });
    return () => {
      //
    };
  }, []);
  return (
    <div className="Lista">
      <div className="Contenedor">{Cont}</div>
      <Fab className="FabIcono" color="secondary" aria-label="edit" onClick={props.AgregarDifucion}>
        <AddIcon />
      </Fab>
    </div>
  );
};
const Cargando = () => {
  return <div>Cargando....</div>;
};
const Vasio = () => {
  return <div>No existen registros....</div>;
};
const ListaDificion = (props) => {
  let array = props.items;
  let Items = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    Items.push(<ItemLista key={index} item={element} {...props}/>);
  }
  return <ul className="ListaDificion">{Items}</ul>;
};
const ItemLista = (props) => {
  return (
    <li className="ItemLista">
      <div className="ItemDatos">
        <div className="ItemDatos1">{props.item.nombre}</div>
        <div className="ItemDatos2">{props.item.area}</div>
      </div>
      <div className="Itemicon">
        <IconButton edge="end" aria-label="Editar" onClick={()=>{props.EditarDifucion(props.item)}}>
          <EditIcon />
        </IconButton>
      </div>
    </li>
  );
};
/////////////////////////////////////
const Agregar = (props) => {
  const [InpValue, setInpValue] = useState({nombre:"",area:"",correo:"",prefijo:"",telefono:""})
  let update = (e)=>{
    let A = InpValue
    A[e.target.name]=e.target.value
    setInpValue({...A})
  }
  let agregarnuevadifucion = ()=>{
    Clientes.AgregarDifucion(InpValue)
    .then((res)=>{
      if(!res.err){
        props.ListaDifucion()
      }
      else{
        alert(res.data)
      }
    })
  }
  return <div className="Agregar">
    <div className="AgregarInps">
      <InputItem onChange={update} value={InpValue.nombre} name="nombre" label="nombre"/>
      <InputItem onChange={update} value={InpValue.area} name="area" label="area"/>
      <InputItem onChange={update} value={InpValue.correo} name="correo" label="correo"/>
      <InputItem onChange={update} value={InpValue.prefijo} name="prefijo" label="prefijo"/>
      <InputItem onChange={update} value={InpValue.telefono} name="telefono" label="telefono"/>
    </div>
    <div className="AgregarBtns">
      <Button className="AddBtn" color="primary" onClick={agregarnuevadifucion}>Agregar</Button>
      <Button className="CancelBtn" color="secondary" onClick={props.ListaDifucion}>Cancelar</Button>
    </div>
  </div>;
};
const InputItem = (props)=>{
  return(
    <div className="InputItem">
      <TextField {...props} className="InputCustom"/>
    </div>
  )
}
/////////////////////////////////////
const Editar = (props) => {
  const [InpValue, setInpValue] = useState(props.itemupdate)
  let update = (e)=>{
    let A = InpValue
    A[e.target.name]=e.target.value
    setInpValue({...A})
  }
  let BorrarDifucion = ()=>{
    Clientes.BorrarDifucion(InpValue)
    .then(()=>{
      props.ListaDifucion()
    })
  }
  return <div className="Agregar">
    <div className="AgregarInps">
      <InputItem onChange={update} value={InpValue.nombre} name="nombre" label="nombre"/>
      <InputItem onChange={update} value={InpValue.area} name="area" label="area"/>
      <InputItem onChange={update} value={InpValue.correo} name="correo" label="correo"/>
      <InputItem onChange={update} value={InpValue.prefijo} name="prefijo" label="prefijo"/>
      <InputItem onChange={update} value={InpValue.telefono} name="telefono" label="telefono"/>
    </div>
    <div className="AgregarBtns">
      <Button className="AddBtn" color="primary" onClick={()=>{Clientes.AgregarDifucion(InpValue)}}>Actualizar</Button>
      <Button className="CancelBtn" color="secondary" onClick={BorrarDifucion}>Borrar</Button>
      <Button className="CancelBtn" color="secondary" onClick={props.ListaDifucion}>Cancelar</Button>
    </div>
  </div>;
};
export default Difucion;
