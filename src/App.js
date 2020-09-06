import React, { useState, useEffect } from "react";
import "./App.scss";
import LoginComp from "./componentes/Login/Login";
import funciones from "./funciones";


import Home from "./componentes/Home/Home"


function App() {
  const [Login, setLogin] = useState({ listo: false, activo: false });
  let Componente
  let OnLogin = ()=>{
    setLogin({listo: true, activo: true})
  }
  useEffect(() => {
    funciones.IsLogin()
    .then((res)=>{
      setLogin({listo: true, activo: res.activo})
    })
    return () => {
      //cleanup
    }
  }, [])
  if (!Login.listo) {
    Componente = "cargando";
  } else {
    if (!Login.activo) {
      Componente = <LoginComp OnLogin={OnLogin}/>;
    } else {
      Componente =  <Home/>;
    }
  }
  return(
    <div className="App">
        {Componente}
    </div>
  )
}

export default App;
