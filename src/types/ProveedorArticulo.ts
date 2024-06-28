import { Articulo } from "./Articulo";
import { Proveedor } from "./Proveedor";

export interface ProveedorArticulo{
    id: number,
    costo_almacenamiento: number, 
    costo_pedido: number, 
    precio_articulo_proveedor: number, 
    tiempo_demora: number, 
    id_articulo: Articulo, 
    id_proveedor: Proveedor
}