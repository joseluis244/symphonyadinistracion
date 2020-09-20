import React, { useEffect, useState } from 'react'
import funciones from "./funciones"
import Dash from "./class/Dashboard"
import { Pie, Doughnut } from 'react-chartjs-2';
import SaveAlt from "@material-ui/icons/SaveAlt"
import IconButton from '@material-ui/core/IconButton';

import "./Dashboard.scss"
function Dashboard() {
    const [DB, setDB] = useState(Dash.Datos());
    useEffect(() => {
        funciones.cargardashboard()
            .then((res) => {
                let A = res.data
                setDB({ ...A })
            })
        return () => {
            //cleanup
        };
    }, []);
    return (
        <div id="Dashboard">
            <div className="toolbar">
                <div className="toolbar1">Dasboard</div>
                <XlsButton/>
            </div>
            <div className="data">
                <div className="Rows">
                    <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "25px" }}>Total de estudios:{DB.cantidadEstudios}</div>
                    <div>
                        <TituloGrafico titulo="espacio de disco" />
                        <Pie data={DB.usodisco} />
                    </div>
                </div>
                <div className="Rows">
                    <div>
                        <TituloGrafico titulo="estudios Dia" />
                        <Doughnut data={DB.cantidaddia} />
                    </div>
                    <div>
                        <TituloGrafico titulo="estudios Dia(Equipos)" />
                        <Doughnut data={DB.cantidaddiaEq} />
                    </div>
                </div>
                <div className="Rows">
                    <div>
                        <TituloGrafico titulo="estudios mes" />
                        <Doughnut data={DB.cantidadmes} />
                    </div>
                    <div>
                        <TituloGrafico titulo="estudios mes(Equipos)" />
                        <Doughnut data={DB.cantidadmesEq} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TituloGrafico = (props) => {
    return (
        <h5 style={{ marginLeft: "5px" }}>{props.titulo}</h5>
    )
}

const XlsButton = () => {
    const [descargando, setdescargando] = useState(false);
    let descargar = ()=>{
        setdescargando(true)
        funciones.xlsx()
        .then(()=>{
            setdescargando(false)
        })
    }
    if(!descargando){
        return (
            <div className="toolbar2" onClick={descargar}>
                <IconButton>
                    <SaveAlt fontSize="large" />
                </IconButton>
            </div>
        )
    }else{
        return (
            <div className="toolbar2L">
            </div>
        )
    }
}

export default Dashboard
