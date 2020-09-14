import Fetchfunciones from "../../../Fetchfunciones"
function cargardifucion(){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.GetData("/Difucion")
        .then((res)=>{
            Pres({err:false,data:res})
        })
    })
}
function ActualizarDifucion(difucion){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.PutData("/Difucion",difucion)
        .then((res)=>{
            Pres(res)
        })
    })
}
function validarcorreo(correo){
    if(correo.split("@").length>1){
        if(correo.split("@")[1].split(".").length>1){
            return true
        }
        else{
            return false
        }
    }else{
        return false
    }

}
function validardatos(obj){
    let array = Object.keys(obj)
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element==="correo"){
            if(!validarcorreo(obj[element])){
                return false
            }
            if(obj[element]===""){
                return false
            }
        }
    }
    return true
}
function AgregarDifucion(difucion){
    return new Promise((Pres,Prej)=>{
        if(validardatos(difucion)){
            Fetchfunciones.PostData("/Difucion",difucion)
            .then((res)=>{
                Pres({err:false,data:res})
            })
        }else{
            Pres({err:true,data:"Datos Incopletos"})
        }
    })
}
function BorrarDifucion(difucion){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.DelData2("/Difucion",difucion._id)
        .then((res)=>{
            Pres(res)
        })
    })
}
let Clientes = {cargardifucion,ActualizarDifucion,AgregarDifucion,BorrarDifucion}
export default Clientes