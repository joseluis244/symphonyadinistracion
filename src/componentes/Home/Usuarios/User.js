class Usuario {
    constructor(){
            this.DATOS= {
                "NOMBRE": "",
                "APELLIDO": "",
                "PREFIJO":0,
                "TELEFONO": 0,
                "CORREO": ""
            }
            this.LOGIN= {
                "USUARIO": "",
                "PASSWORD": "Medicaltec2020"
            }
            this.CONFIGURACION= {
                "LISTABLE": true,
                "RESTRINGIDO": false,
                "TIPO": "admin",
                "ESTADO": "activo",
                "FECHACREACION": new Date(),
                "ULTIMOACCESO": new Date()
            }
            this.LISTA = []
    }
    agregardatos(campo,valor){
        this.DATOS[campo] = valor
    }
    json(){
        return {
            DATOS:this.DATOS,
            LOGIN:this.LOGIN,
            CONFIGURACION:this.CONFIGURACION,
            LISTA:this.LISTA
        }
    }
}

export default Usuario