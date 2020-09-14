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
function PostData(url,data){
    return new Promise((Pres,Prej)=>{
        axios.post(url,data)
        .then((res)=>{
            Pres(res.data)
        })
    })
}
function PutData(url,data){
    return new Promise((Pres,Prej)=>{
        axios.put(url,data)
        .then((res)=>{
            Pres(res.data)
        })
    })
}
function DelData(url,data){
    return new Promise((Pres,Prej)=>{
        axios.delete(`${url}/${data._id}`)
        .then((res)=>{
            Pres(res.data)
        })
    })
}
function DelData2(url,data){
    return new Promise((Pres,Prej)=>{
        axios.delete(`${url}/${data}`)
        .then((res)=>{
            Pres(res.data)
        })
    })
}
let Envios = {PostFile,GetData,PutData,DelData,DelData2,PostData}
export default Envios