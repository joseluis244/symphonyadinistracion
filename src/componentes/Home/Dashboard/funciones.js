import Fetchdata from "../../../Fetchfunciones"
import moment from "moment"
function cargardashboard() {
    return new Promise((Pres, Prej) => {
        Fetchdata.GetData("./Dashboard")
            .then((res) => {
                Pres({ err: false, data: res })
            })
    })
}
function xlsx() {
    return new Promise((Pres,Prej)=>{
        Fetchdata.GetData("./Dashboardxlsx", { responseType: 'blob' })
            .then((res) => {
                let excel = window.URL.createObjectURL(res);
                let tempLink = document.createElement('a');
                tempLink.href = excel;
                tempLink.setAttribute('download', `${moment().format("YYYYMMDD")}.xlsx`);
                tempLink.click();
                Pres({err:false,data:null})
            })
            .catch((e)=>{
                Prej({err:true,data:e})
            })
    })
}
let funciones = { cargardashboard, xlsx }
export default funciones