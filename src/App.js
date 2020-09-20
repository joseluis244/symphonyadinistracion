import React, { useState, useEffect } from "react";
import "./App.scss";
import LoginComp from "./componentes/Login/Login";
import funciones from "./funciones";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


import Home from "./componentes/Home/Home"

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#014461",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#c63d2d',
    },
  },
});


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
    <ThemeProvider theme={theme}>
    <div className="App">
        {Componente}
    </div>
    </ThemeProvider>
  )
}

export default App;
