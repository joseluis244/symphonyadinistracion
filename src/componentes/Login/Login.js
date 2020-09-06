import React, { useState } from "react";
import "./Login.scss";
import Paper from "@material-ui/core/Paper";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import logo from "./logomedicaltec.svg"
import funciones from "./funciones"

function Login(props) {
    const [File, setFile] = useState(null)
    let cargarkey = (e)=>{
        setFile(e.target.files[0])
    }
    let authenticar = ()=>{
        funciones.Authenticar(File)
        .then((res)=>{
            if(res){
                props.OnLogin()
            }else{
                setFile(null)
            }
        })
    }
  return (
    <div id="Login">
      <Paper className="Contenedor">
        <div className="Login1">
            <img src={logo} alt="logo" width={200}/>
        </div>
        <div className="Login2">Cargar la Llave</div>
        <div className="Login3">
          <Input type="file" onChange={cargarkey} inputProps={{ accept: '.key' }} id="keyinput"/>
        </div>
        <div className="Login4">
          <Button variant="contained" color="secondary" onClick={authenticar}>
            Cargar
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
