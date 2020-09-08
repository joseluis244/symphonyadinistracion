import Fetchfunciones from "../../../Fetchfunciones"
function cargardifucion(){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.GetData("/cargardifucion")
        .then((res)=>{
            Pres({err:false,data:res})
        })
    })
}
let Clientes = {cargardifucion}
export default Clientes