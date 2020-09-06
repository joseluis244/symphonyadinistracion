class Usuario {
    constructor(){
            this.DATOS= {
                "NOMBRE": "",
                "APELLIDO": "",
                "TELEFONO": null,
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
}

export default Usuario