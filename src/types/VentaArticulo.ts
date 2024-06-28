import { Articulo } from "./Articulo";
import { Venta } from "./Venta";

export interface VentaArticulo {
    id: number;
    cantidadVenta: number;
    subtotal: number;
    id_articulo: Articulo;
    id_venta: Venta;
}