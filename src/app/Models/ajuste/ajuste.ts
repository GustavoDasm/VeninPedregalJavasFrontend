import { Sucursal } from "../sucursal/sucursal";

export interface Ajuste {
  idajuste: number;
  numero?: string | null;
  fecha?: string | null;
  referencia?: string | null;
  idsuscursal: Sucursal;
}