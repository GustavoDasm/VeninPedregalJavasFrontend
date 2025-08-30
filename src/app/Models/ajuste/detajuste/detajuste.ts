import { Articulo } from "../../articulo/articulo";

export class Detajuste {
    n?:number;
    idajuste?:string;
    idproduct?:string;
    articulo?:Articulo;
    cantidad?:number;
    valunit?:number;
    inven?:number;
    inven_sald?:number;
    item?:number;
    texto?:string;
    id_det?:string;
    total?:number;
    personalc_id?:string;
    personalm_id?:string;
    dtmodificacion?:string;

    constructor(){
        this.articulo = new Articulo();
    }
}
