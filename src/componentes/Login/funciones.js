import funcionesfetch from "../../Fetchfunciones"

function leerkey(key){
    return new Promise((Pres,Prej)=>{
        key.text()
        .then((res)=>{
            Pres(res)
        })
    })
}

function Authenticar(key){
    return new Promise((Pres,Prej)=>{
        leerkey(key)
        .then((res)=>{
            funcionesfetch.PostFile("keyload",{key:res})
            .then((res2)=>{
                if(!res2.err){
                    window.localStorage.setItem("AdminUser",JSON.stringify(res2.user))
                    window.localStorage.setItem("KeyMed",res)
                    Pres(true)
                }else{
                    document.getElementById("keyinput").value = ""
                    alert("Llave no valida")
                    Pres(false)
                }
            })
        })
    })
}

let LoginF = {Authenticar}

export default LoginF