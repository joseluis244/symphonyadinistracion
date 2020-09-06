import funcionesfetch from "./Fetchfunciones"
function IsLogin(){
    return new Promise((Pres,Prej)=>{
        let key = window.localStorage.getItem("KeyMed")
        if(key!==null){
            funcionesfetch.PostFile("keyload",{key:key})
            .then((res)=>{
                if(!res.err){
                    window.localStorage.setItem("AdminUser",JSON.stringify(res.user))
                    Pres({key:true,activo:true})
                }else{
                    Pres({key:false,activo:false})
                }
            })
            .catch((e)=>{
                alert("Falla en la comunucacion con el servidor")
            })
        }else{
            Pres({key:false,activo:false})
        }
    })
}
let funciones = {IsLogin}
export default funciones