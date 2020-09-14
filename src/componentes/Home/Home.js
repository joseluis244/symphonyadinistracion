import React, { useEffect, useState } from "react";
import "./Home.scss";

import Dashboard from "./Dashboard/Dashboard";
import Difucion from "./Difucion/Difucion";
import Estudios from "./Estudios/Estudios";
import Usuarios from "./Usuarios/Usuarios";

import IconButton from "@material-ui/core/IconButton";
import Chart from "@material-ui/icons/PieChart";
import Person from "@material-ui/icons/Person";
import Difu from "@material-ui/icons/Group";
import Est from "@material-ui/icons/FilterList";

function Home() {
  const [Componente, setComponente] = useState(3);
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
          <SideBarBtn onClick={cambiar} index={0} lab={<Chart style={{color:"white"}}/>}/>
          <SideBarBtn onClick={cambiar} index={1} lab={<Person style={{color:"white"}}/>}/>
          <SideBarBtn onClick={cambiar} index={2} lab={<Difu style={{color:"white"}}/>}/>
          <SideBarBtn onClick={cambiar} index={3} lab={<Est style={{color:"white"}}/>}/>
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
        <div className="btn" onClick={onClick}>
          <IconButton aria-label="delete">
        {props.lab}
      </IconButton>
        </div>
    )
}

export default Home;
