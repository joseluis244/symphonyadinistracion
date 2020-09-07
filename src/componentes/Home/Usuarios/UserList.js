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
function updateuser(data){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.PutData('/actualizarusuario',data)
        .then((res)=>{
            Pres(res)
        })
    })
}
function borrarusuario(data){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.DelData('/actualizarusuario',data)
        .then((res)=>{
            Pres(res)
        })
    })
}
function validardatos(datos){
    if(datos.LOGIN.USUARIO.split("@").length<2){
        return false
      }else{
          let array = Object.keys(datos.DATOS)
          for (let index = 0; index < array.length; index++) {
              const element = array[index];
              if(datos.DATOS[element]===""){
                  return false
              }
          }
          return true
      }
}
function crearusuario(data){
    return new Promise((Pres,Prej)=>{
        Fetchfunciones.PutData('/crearusuario',data)
        .then((res)=>{
            Pres(res)
        })
    })
}

let UserList = {CargarLista,updateuser,validardatos,crearusuario,borrarusuario}
export default UserList