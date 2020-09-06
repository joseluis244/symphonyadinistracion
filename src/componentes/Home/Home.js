import React, { useEffect, useState } from "react";
import "./Home.scss";

import Dashboard from "./Dashboard/Dashboard";
import Difucion from "./Difucion/Difucion";
import Estudios from "./Estudios/Estudios";
import Usuarios from "./Usuarios/Usuarios";

function Home() {
  const [Componente, setComponente] = useState(1);
  let Comp = [<Dashboard />,<Usuarios />,<Difucion />,<Estudios />];
  let cambiar = (e)=>{
    setComponente(e)
  }
  useEffect(() => {
    console.log("install pront");
    return () => {
      //cleanup
    };
  }, []);
  return (
    <div id="Home">
      <div className="HomeCont1">
          <SideBarBtn onClick={cambiar} index={0} lab={0}/>
          <SideBarBtn onClick={cambiar} index={1} lab={1}/>
          <SideBarBtn onClick={cambiar} index={2} lab={2}/>
          <SideBarBtn onClick={cambiar} index={3} lab={3}/>
      </div>
      <div className="HomeCont2">{Comp[Componente]}</div>
    </div>
  );
}

let SideBarBtn = (props)=>{
    let onClick = ()=>{
        props.onClick(props.index)
    }
    return(
        <div className="btn" onClick={onClick}>{props.lab}</div>
    )
}

export default Home;
