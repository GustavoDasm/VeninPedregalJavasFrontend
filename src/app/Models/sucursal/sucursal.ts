export interface Sucursal {
  idsucursal: number;
  nombre?: string | null;
  direccion?: string | null;
  region?: string | null;
  telefono?: string | null;
  fax?: string | null;
  email?: string | null;
  token?: string | null;
  ruta?: string | null;
  notas?: string | null;
  tam_boleta?: string | null;
  tam_factura?: string | null;
  tam_pedido?: string | null;
  empresa: number; // o Empresa
}