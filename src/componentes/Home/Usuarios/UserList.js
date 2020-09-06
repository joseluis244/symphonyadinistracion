import Fetchfunciones from "../../../Fetchfunciones";
function CargarLista(){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.GetData("/listausuarios")
        .then((res)=>{
            Pres(res)
        })
        .catch((e)=>{
            Prej(e)
        })
    })
}
let UserList = {CargarLista}
export default UserList