import React, { useState, useEffect } from "react";
import Clientes from "./Difuciones"

import EditIcon from "../iconos/edit-black-48dp.svg"

function Difucion() {
  const [Componente, setComponente] = useState(0);
  let OnComponetChange = (e) => {
    setComponente(e);
  };
  const Comp = [
    <Main OnComponetChange={OnComponetChange} />,
    <Editar OnComponetChange={OnComponetChange} />,
    <Agregar OnComponetChange={OnComponetChange} />,
  ];
  return <div id="Difucion">{Comp[Componente]}</div>;
}
/////////////////////////////////////
const Main = (props) => {
    const [Lista, setLista] = useState({listo:false,lista:[]})
    useEffect(() => {
        Clientes.cargardifucion()
        .then((res)=>{
            setLista({listo:true,lista:res.data})
        })
        return () => {
            //cleanup
        }
    }, [])
  let agregar = () => {
    props.OnComponetChange(2);
  };
  return (
    <div>
      <div onClick={agregar}>agregar</div>
      <div>
          {Lista.listo?<ListaItems {...props} items={Lista.lista}/>:"Cargando...."}
      </div>
    </div>
  );
};
let ListaItems = (props)=>{
    let array = props.items
    let Items = []
    for (let index = 0; index < array.length; index++) {
        Items.push(<Item {...props} key={index} cliente={array[index].nombre}/>)
    }
    return(
        <ul>
            {array.length>0?Items:"Sin Registros..."}
        </ul>
    )
}
const Item = (props)=>{
    let editar = () => {
        props.OnComponetChange(1);
      };
    return(
        <li>
            <div>{props.cliente}</div>
            <div onClick={editar}><img src={EditIcon} alt="edit" width={20}/></div>
        </li>
    )
}
////////////////////////////////////
const Editar = (props) => {
    let Volver = ()=>{
        props.OnComponetChange(0);
    }
  return <div onClick={Volver}>
  <h3>Editar</h3>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
  </div>;
};
/////////////////////////////////////
const Agregar = (props) => {
    let Volver = ()=>{
        props.OnComponetChange(0);
    }
  return <div onClick={Volver}>agregar</div>;
};
export default Difucion;
