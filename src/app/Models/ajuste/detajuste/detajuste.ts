import { Ajuste } from "../../ajuste";
import { Articulos } from "../../articulos/articulos";

export interface Detajuste {
  idajuste: Ajuste;
  cantidad?: number | null;
  idproduct: Articulos;
}
