import Fetchdata from "../../../Fetchfunciones"
function cargarestudios(){
    return new Promise((Pres,prej)=>{
        Fetchdata.GetData("./estudios")
        .then((res)=>{
            Pres({err:false,data:res})
        })
    })
}
function eliminarestudio(data){
    return new Promise((Pres,Prej)=>{
        Fetchdata.DelData2("./estudios",data.EST_UID)
        .then(res=>{
            Pres(res)
        })
    })
}
let Funciones = {cargarestudios,eliminarestudio}
export default Funciones