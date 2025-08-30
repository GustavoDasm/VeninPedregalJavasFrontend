import { TipoDocumento } from '../tipodocumento/tipo-documento';
import { ClienteDireccion } from './clientedireccion/cliente-direccion';

export class Cliente {
    n?:string;
    idcliente?:string;
    nombre?:string;
    apellidos?:string;
    nombrecompleto?:string;
    ruc?:string;
    dni?:string;
    documento?:string;
    tipodocumento?:any;
    tipodocide?:string;
    direccion?:string;
    email?:string;
    telefono?:string;
    email1?:string;
    email2?:string;
    contacto?:string;
    nomubigeo?:string;
    direcciones?:ClienteDireccion[];
    constructor(){
        this.direcciones = [];
    }
}
