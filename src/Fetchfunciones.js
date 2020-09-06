import axios from "axios"

function PostFile(url,data){
    return new Promise((Pres,Prej)=>{
        axios.post(`./${url}`,data)
        .then((res)=>{
            if(res.status === 200){
                Pres(res.data)
            }else{
                Prej(res.status)
            }
        })
        .catch((e)=>{
            Prej(e)
        })
    })
}
function GetData(url){
    return new Promise((Pres,Prej)=>{
        axios.get(url)
        .then((res)=>{
            Pres(res.data)
        })
        .catch((e)=>{
            Prej(e)
        })
    })
}
let Envios = {PostFile,GetData}
export default Envios