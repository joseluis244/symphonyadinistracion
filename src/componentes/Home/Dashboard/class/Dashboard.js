const colores1=["#2364AA","#73BFB8","#EA7317","#3DA5D9","#FEC601"]
const colores2=["#8CB369","#F4A259","#BC4B51","#F4E285","#5B8E7D"]
class Dashboard {
    constructor() {
        this.cantidadEstudios = 0
        this.usodisco = new GraficoPie();
        this.cantidaddia = new GraficoDona(colores1);
        this.cantidadmes = new GraficoDona(colores1);
        this.cantidaddiaEq = new GraficoDona(colores2);
        this.cantidadmesEq = new GraficoDona(colores2);
        this.estudios24 = []
    }
    Datos() {
        return {
            cantidadEstudios: this.cantidadEstudios,
            usodisco: this.usodisco,
            cantidaddia: this.cantidaddia.verdatos(),
            cantidadmes: this.cantidadmes.verdatos(),
            cantidaddiaEq: this.cantidaddiaEq.verdatos(),
            cantidadmesEq: this.cantidadmesEq.verdatos(),
            estudios24: this.estudios24
        }
    }
}

class GraficoDona {
    constructor(bg) {
        this.labels = []
        this.datasets = [{
            data: [],
            backgroundColor: bg
        }]
    }
    verdatos() {
        return (
            {
                labels: this.labels,
                datasets: this.datasets
            }
        )
    }
}
class GraficoPie {
    constructor() {
        this.labels = ["libre","usado"]
        this.datasets = [{
            data: [100,0],
            backgroundColor: ["#008148","#CC2936"]
        }]
    }
    verdatos() {
        return (
            {
                labels: this.labels,
                datasets: this.datasets
            }
        )
    }
}

let DashboardC = new Dashboard()
export default DashboardC