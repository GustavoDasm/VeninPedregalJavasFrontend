import { Zona } from '../zona/zona';
import { UnidadMedida } from '../unidadmedida/unidad-medida';
import { Articulos } from '../articulos/articulos';
import { Moneda } from '../moneda/moneda';


export class Precio {
    n?:string;
    idprecio?:string;
    moneda?:Moneda;
    valvta?:string;
    igv?:string;
    impuesto?:string;
    preventa?:string;
    utilidad?:string;
    codbar?:string;
    precios?:number;
    usuario_id?:string;
    idzona?:string;
    zona?:Zona;
    preciomin: string;
    unidad?:UnidadMedida;
    idproduct?:Articulos;

    constructor(){
        this.moneda = new Moneda();
        this.unidad = new UnidadMedida();
        this.zona = new Zona();
        this.idproduct = new Articulos();
    }

    GetData(){
        let data = {
            idprecio:this.idprecio,
            idzona:this.idzona,
            moneda:this.moneda.idmoneda,
            valvta:this.valvta,
            igv:this.igv,
            impuesto:this.impuesto,
            preventa:this.preventa,
            utilidad:this.utilidad,
            codbar:this.codbar,
            precios:this.precios,
            usuario_id:this.usuario_id,
            zona:this.zona,
            unidad:this.unidad.idunidad,
            idproduct:this.idproduct.idproduct
        }
        return data;
    }
}