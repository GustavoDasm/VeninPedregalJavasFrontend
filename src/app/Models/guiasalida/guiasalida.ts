import { Cliente } from "../cliente/cliente";
import { Sucursal } from "../sucursal/sucursal";
import { Transportista } from "../transportista/transportista";

export interface GuiaSalida {
  idguiar: number;
  fecha?: string | null;
  hora?: string | null;
  estado?: string | null;
  referencia?: string | null;
  total?: number | null;
  idcliente: Cliente;
  idtransporte: Transportista;
  idsucursal: Sucursal;
}